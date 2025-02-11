import * as THREE from "three";

class Circle {
  constructor(scene) {
    this.scene = scene;
    this.drawing = false;
    this.center = null;
    this.circleMesh = null;
    // this.sphere = null;
  }

  startDrawing(center) {
    this.center = center.clone();
    this.drawing = true;

    // Show a sphere at the starting point
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.sphere.position.copy(this.center);
    this.scene.add(this.sphere);
  }

  updateDrawing(point) {
    if (!this.drawing || !this.center) return;

    const radius = this.center.distanceTo(point);
    if (radius <= 0) return;

    // Remove previous circle
    if (this.circleMesh) {
      this.scene.remove(this.circleMesh);
    }

    // Create a Ring
    const geometry = new THREE.RingGeometry(radius * 0.98, radius, 64);
    geometry.rotateX(-Math.PI / 2);

    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });

    this.circleMesh = new THREE.Mesh(geometry, material);
    this.circleMesh.position.copy(this.center);

    this.scene.add(this.circleMesh);
  }

  stopDrawing() {
    if (this.sphere) {
      this.scene.remove(this.sphere);
      this.sphere = null;
    }
    this.drawing = false;
  }
}

export default Circle;
