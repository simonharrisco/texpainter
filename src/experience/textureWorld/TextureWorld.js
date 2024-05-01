import Experience from "../Experience";
import * as THREE from "three";

export default class TextureWorld {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.texScene;
    this.scene.background = new THREE.Color(0xa0a0a0);

    this.camera = this.experience.texCamera;

    this.resources = this.experience.resources;
    this.geometry = new THREE.PlaneGeometry(2, 2);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      // wireframe: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }
  setMaterialTexture(texture) {
    console.log(texture);
    this.scene.remove(this.mesh);
    this.texture = texture;

    //get rid of blur
    // this.texture.minFilter = THREE.NearestFilter;
    // this.texture.magFilter = THREE.NearestFilter;
    this.texture.flipY = false;

    this.texture.needsUpdate = true;

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.material.map = this.texture;
    this.mesh.material.needsUpdate = true;

    this.scene.add(this.mesh);
  }
}
