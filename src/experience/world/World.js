import Experience from "../Experience";
import * as THREE from "three";

import AmbientLight from "./AmbientLight";
import DirectionalLight from "./DirectionalLight";
import Floor from "./Floor";
import Avatar from "./Avatar";

export default class World {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;
    this.scene.background = new THREE.Color(0xa0a0a0);
    this.scene.fog = new THREE.Fog(0xa0a0a0, 1, 200);

    this.resources = this.experience.resources;
    // shit has loaded -> add it to scene ?
    this.resources.on("ready", () => {
      this.addAvatar();
    });
    this.addStage();
  }

  addStage() {
    this.ambientLight = new AmbientLight();
    this.directionalLight = new DirectionalLight();
    this.floor = new Floor();
  }

  addAvatar() {
    this.avatar = new Avatar();
  }

  playAnimation() {
    if (this?.avatar?.update) {
      this.avatar.update();
    }
  }
}
