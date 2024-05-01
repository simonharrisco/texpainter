import Experience from "../Experience";
import EventEmitter from "./EventEmitter";
import * as THREE from "three";

export default class Mouse extends EventEmitter {
  constructor() {
    super();
    this.normalisedPosition = new THREE.Vector2();

    this.experience = new Experience();

    // for now we assume
    window.addEventListener("mousemove", (event) => {
      this.normalisedPosition.x =
        (event.clientX / this.experience.sizes.width) * 2 - 1;
      this.normalisedPosition.y =
        -(event.clientY / this.experience.sizes.height) * 2 + 1;

      this.trigger("mousemove");
    });
  }
}
