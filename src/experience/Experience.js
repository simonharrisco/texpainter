import * as THREE from "three";
import assetPaths from "../assets/paths/initialAssetPaths";
import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import Resources from "./utils/Resources";
import Camera from "./modelWorld/Camera";
import Renderer from "./modelWorld/Renderer";
import World from "./modelWorld/World";
import TextureCamera from "./textureWorld/TextureCamera";
import TextureRenderer from "./textureWorld/TextureRenderer";
import TextureWorld from "./textureWorld/TextureWorld";

// turning the experience into a singleton.
let instance = null;

export default class Experience {
  constructor(canvas, texCanvas) {
    // turning the experience into a singleton.
    if (instance) {
      return instance;
    }
    instance = this;

    // global useful
    this.time = new Time();
    this.resources = new Resources(assetPaths);

    // for the 3d scene
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    // for the 2d tex scene
    this.texCanvas = texCanvas;
    this.texScene = new THREE.Scene();
    this.texCamera = new TextureCamera();
    this.texRenderer = new TextureRenderer();
    this.texWorld = new TextureWorld();

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
    this.texRenderer.update();
    this.world.playAnimation();
  }

  initModel(model) {
    this.world.addModelView(model);
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
