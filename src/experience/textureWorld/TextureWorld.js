import Experience from "../Experience";
import * as THREE from "three";

export default class TextureWorld {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.texScene;
    this.scene.background = new THREE.Color(0xa0a0a0);

    this.camera = this.experience.texCamera;

    this.resources = this.experience.resources;

    this.createImagePlane();
    this.createPointerSphere();
  }
  createImagePlane() {
    this.geometry = new THREE.PlaneGeometry(2, 2);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      // wireframe: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }
  createPointerSphere() {
    this.pointerSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.02, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, opacity: 0.5 })
    );
    this.scene.add(this.pointerSphere);
  }

  setMaterialTexture(child) {
    let texture = child.material.map;
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
    this.mesh.position.set(0, 0, 0);
    this.scene.add(this.mesh);

    this.displayGeometry = new THREE.BufferGeometry();
    this.refToUvArray = child.geometry.attributes.uv.array;
    this.vertArrayFromUvs = [];

    for (let i = 0; i < this.refToUvArray.length; i += 2) {
      let x = (this.refToUvArray[i] % 1) * 2 - 1;
      let y = (this.refToUvArray[i + 1] % 1) * 2 - 1;
      this.vertArrayFromUvs.push(x, y, 0);
    }

    this.vertices = new Float32Array(this.vertArrayFromUvs);
    this.displayGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.vertices, 3)
    );

    if (child.geometry.index) {
      this.displayGeometry.setIndex(child.geometry.index);
    }

    this.displayMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });

    this.displayMesh = new THREE.Mesh(
      this.displayGeometry,
      this.displayMaterial
    );
    this.displayMesh.position.set(0, 0, 0);

    this.scene.add(this.displayMesh);
  }

  handleIntersect(intersect) {
    this.pointerSphere.position.set(
      (intersect.uv.x % 1) * 2 - 1,
      (intersect.uv.y % 1) * 2 - 1,
      0
    );
  }

  destroy() {
    this.scene.remove(this.mesh);
    this.scene.remove(this.displayMesh);
  }
}
