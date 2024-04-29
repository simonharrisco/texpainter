import * as THREE from "three";
import assetPaths from "../assets/paths/initialAssetPaths";
import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import Resources from "./utils/Resources";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./world/World";

// turning the experience into a singleton.
let instance = null;

export default class Experience {
  constructor(canvas) {
    // turning the experience into a singleton.
    if (instance) {
      return instance;
    }
    instance = this;

    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assetPaths);

    this.world = new World();

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.world.playAnimation();
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });
    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    // we havnt built any debug yet
    if (this?.debug?.active) {
      this.debug.ui.destroy();
    }
  }
}
