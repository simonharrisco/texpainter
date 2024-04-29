import * as THREE from "three";
import Experience from "../Experience";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Avatar {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;

    this.animations = this.resources.items["animations"].animations;

    this.currentAvatarName = "hoodie";
    this.currentAvatarModel =
      this.resources.items[this.currentAvatarName].scene;

    this.createAvatar();
  }
  createAvatar() {
    // assign texture
    this.syntyModelTexture = this.resources.items["syntyModelTexture"];
    this.syntyModelTexture.colorSpace = THREE.SRGBColorSpace;

    this.currentAvatarModel.traverse((child) => {
      if (child.isMesh) {
        child.material.map = this.syntyModelTexture;
      }
    });

    this.currentAvatarModel.scale.set(0.01, 0.01, 0.01);
    this.currentAvatarModel.position.set(0, 0.5, 0);
    this.currentAvatarModel.traverse(function (node) {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });

    this.scene.add(this.currentAvatarModel);

    // this.animations = this.animationsScene.animations;
    this.mixer = new THREE.AnimationMixer(this.currentAvatarModel);

    this.action = this.mixer.clipAction(this.animations[3]);
    this.action.play();
  }

  changeAvatar(avatarName) {
    // load new asset
    let mixerTime = this.mixer.time;

    let loader = new GLTFLoader();
    loader.load(`/assets/models/${avatarName}.gltf`, (model) => {
      this.scene.remove(this.currentAvatarModel);

      this.currentAvatarModel = model.scene;

      this.syntyModelTexture = this.resources.items["syntyModelTexture"];
      this.syntyModelTexture.colorSpace = THREE.SRGBColorSpace;

      this.currentAvatarModel.traverse((child) => {
        if (child.isMesh) {
          child.material.map = this.syntyModelTexture;
        }
      });
      this.currentAvatarModel.scale.set(0.01, 0.01, 0.01);
      this.currentAvatarModel.position.set(0, 0.5, 0);
      this.currentAvatarModel.traverse(function (node) {
        if (node.isMesh) {
          node.castShadow = true;
        }
      });
      this.scene.add(this.currentAvatarModel);
      this.mixer = new THREE.AnimationMixer(this.currentAvatarModel);
      this.action = this.mixer.clipAction(this.animations[3]);
      this.action.play();
      this.mixer.setTime(mixerTime);
    });

    // can i play animation from same spot.
    // remove
  }

  update() {
    this.mixer.update(this.experience.time.delta * 0.001);
  }

  getMixerInfo() {
    return this.mixer;
  }
}
