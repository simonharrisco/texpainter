import * as THREE from "three";
import Experience from "../Experience";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.setInstance();
  }
  setInstance() {
    // floor
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2000, 2000),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    );
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;
    this.mesh.position.y = -0.08;
    this.mesh.name = "floor";
    this.scene.add(this.mesh);

    this.grid = new THREE.GridHelper(50, 50, 0x000000, 0x000000);
    this.grid.material.opacity = 0.2;
    this.grid.material.transparent = true;
    this.grid.position.y = -0.08;
    this.grid.name = "grid";
    this.scene.add(this.grid);
  }
}
