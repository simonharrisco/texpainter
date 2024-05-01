import * as THREE from "three";
import Experience from "../Experience";

export default class DirectionalLight {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.DirectionalLight(0xffffff, 2);
    this.instance.castShadow = true;
    this.instance.shadow.mapSize.set(1024, 1024);
    this.instance.shadow.camera.far = 15;
    this.instance.shadow.normalBias = 0.05;
    this.instance.position.set(-2, 2, 2);
    this.scene.add(this.instance);
  }
}
