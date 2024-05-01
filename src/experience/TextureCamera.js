import * as THREE from "three";

import Experience from "./Experience";

export default class TextureCamera {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.texScene;
    this.canvas = this.experience.texCanvas;
    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.instance.position.set(0, 0, 1);
    this.scene.add(this.instance);
  }
}
