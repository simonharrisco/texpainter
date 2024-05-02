import Experience from "../Experience";
import * as THREE from "three";

import AmbientLight from "./AmbientLight";
import DirectionalLight from "./DirectionalLight";
import Floor from "./Floor";
import ModelView from "./ModelView";

export default class World {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;
    this.scene.background = new THREE.Color(0xa0a0a0);
    this.scene.fog = new THREE.Fog(0xa0a0a0, 1, 200);
    this.model = new ModelView();

    this.raycaster = new THREE.Raycaster();

    this.resources = this.experience.resources;
    // shit has loaded -> add it to scene ?
    this.resources.on("ready", () => {});

    //this.addModelView();
    this.addStage();
  }

  addStage() {
    this.ambientLight = new AmbientLight();

    this.floor = new Floor();

    const cubeTextureLoader = new THREE.CubeTextureLoader();

    this.environmentMap = cubeTextureLoader.load([
      "/environmentMaps/0/px.png",
      "/environmentMaps/0/nx.png",
      "/environmentMaps/0/py.png",
      "/environmentMaps/0/ny.png",
      "/environmentMaps/0/pz.png",
      "/environmentMaps/0/nz.png",
    ]);

    this.scene.environment = this.environmentMap;
  }

  addModelView(model) {
    if (this.model) {
      console.log("here?");
      this.model.addNewModel(model);
      return;
    }
  }

  raycast() {
    //cast a ray from the camera at the mouse position
    this.raycaster.setFromCamera(
      this.experience.mouse.normalisedPosition,
      this.experience.camera.instance
    );

    const intersects = this.raycaster.intersectObjects(this.scene.children);

    const relevant = [];
    // only pay attention to meshs
    intersects.forEach((intersect) => {
      if (intersect.object.name != "floor" && intersect.object.name != "grid") {
        relevant.push(intersect);
      }
    });
    if (relevant.length > 0) {
      this.experience.texWorld.handleIntersect(relevant[0]);
    }
  }
  playAnimation() {}
}
