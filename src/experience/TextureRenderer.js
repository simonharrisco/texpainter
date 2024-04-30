import * as THREE from "three";
import Experience from "./Experience";

export default class TextureRenderer {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.texCanvas;

    this.scene = this.experience.texScene;
    this.camera = this.experience.texCamera.instance;

    this.setInstance();
  }

  setInstance() {
    console.log(this.canvas);
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
  }

  update() {
    this.instance.render(this.scene, this.camera);
  }
}
