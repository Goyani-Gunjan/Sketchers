import * as THREE from "three";

class Circle {
  constructor(scene) {
    this.scene = scene;
    this.drawing = false;
    this.center = null;
    this.circleMesh = null;
    this.sphere = null;
  }

  startDrawing(center) {


    this.center = center.clone();
    this.drawing = true;

    // Create a Sphere at the center
    const sphereGeometry = new THREE.SphereGeometry(1.5, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.sphere.position.copy(this.center);
    this.scene.add(this.sphere);
  }

  updateDrawing(point) {
    if (!this.drawing || !this.center) return;

    const radius = this.center.distanceTo(point);
    if (radius <= 0) return;

    // Remove previous circle before drawing a new one
    if (this.circleMesh) {
      this.scene.remove(this.circleMesh);
      this.circleMesh.geometry.dispose();
      this.circleMesh.material.dispose();
    }

    // Create a new ring for this circle
    const geometry = new THREE.RingGeometry(radius * 0.98, radius, 64);
    geometry.rotateX(-Math.PI / 2);

    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });

    this.circleMesh = new THREE.Mesh(geometry, material);
    this.circleMesh.position.copy(this.center);
    
    this.scene.add(this.circleMesh);
  }

  stopDrawing() {
    this.drawing = false; // Stop drawing but keep the shape
    console.log(this.center)
  }

}

export default Circle;
