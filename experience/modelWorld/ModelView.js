import * as THREE from "three";
import Experience from "../Experience";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class ModelView {
  constructor(model) {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;

    // if (!model) {
    //   this.currentAvatarModel = this.resources.items["damagedHelmet"];
    // } else {
    //   this.currentAvatarModel = model;
    // }

    // this.createAvatar();
    // this.extractTextures();
  }
  addNewModel(model) {
    if (this.currentAvatarModel) {
      this.scene.remove(this.currentAvatarModel.scene);
    }
    this.currentAvatarModel = model;

    this.createAvatar();
    this.extractTextures();
  }

  createAvatar() {
    console.log("called");

    this.currentAvatarModel.scene.traverse(function (node) {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });

    const box3 = new THREE.Box3().setFromObject(this.currentAvatarModel.scene);
    const size = new THREE.Vector3();
    box3.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 1 / maxDim;

    console.log("scale", scale);

    this.currentAvatarModel.scene.name = "avatar";
    this.currentAvatarModel.scene.scale.set(scale, scale, scale);
    console.log(this.currentAvatarModel.scene);
    this.scene.add(this.currentAvatarModel.scene);
  }
  extractTextures() {
    this.currentAvatarModel.scene.traverse((child) => {
      if (child?.material?.map) {
        this.experience.texWorld.setMaterialTexture(child);
      }
    });
  }
  destroy() {
    this.scene.remove(this.currentAvatarModel);
  }
}
