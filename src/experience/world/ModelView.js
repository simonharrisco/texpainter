import * as THREE from "three";
import Experience from "../Experience";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class ModelView {
  constructor(model) {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;

    if (!model) {
      this.currentAvatarModel = this.resources.items["hoodie"];
    } else {
      this.currentAvatarModel = model;
    }

    this.createAvatar();
    this.extractTextures();
  }
  createAvatar() {
    this.currentAvatarModel.scene.traverse(function (node) {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
    if (this.currentAvatarModel == this.resources.items["hoodie"]) {
      this.currentAvatarModel.scene.scale.set(0.01, 0.01, 0.01);
      this.currentAvatarModel.scene.position.set(0, 0.5, 0);
    }

    this.scene.add(this.currentAvatarModel.scene);
  }
  extractTextures() {
    this.currentAvatarModel.scene.traverse((child) => {
      if (child?.material?.map) {
        this.experience.texWorld.setMaterialTexture(child.material.map);
      }
    });
  }
  destroy() {
    this.scene.remove(this.currentAvatarModel);
  }
}
