import * as THREE from "three";

class Line {
  constructor(scene) {
    this.scene = scene;
    this.drawing = false;
    this.line = null;
    this.startPoint = null;
    this.sphere = null;
  }

  startDrawing(startPoint) {
    console.log(startPoint)
    this.startPoint = startPoint.clone();
    this.drawing = true;

    // Create a sphere to show the first point
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.sphere.position.copy(this.startPoint);
    this.scene.add(this.sphere);

    // Create a temporary line
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const points = [this.startPoint, this.startPoint.clone()];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.line = new THREE.Line(geometry, material);
    this.scene.add(this.line);
  }

  updateDrawing(endPoint) {
    if (!this.drawing || !this.line) return;

    console.log(endPoint)
    
    const points = this.line.geometry.attributes.position.array;
    console.log(points)
    points[3] = endPoint.x;
    points[4] = endPoint.y;
    points[5] = endPoint.z;
    this.line.geometry.attributes.position.needsUpdate = true;
  }

  stopDrawing() {
    if (this.sphere) {
      this.scene.remove(this.sphere); // Remove the sphere after second click
      this.sphere = null;
    }
    this.drawing = false;
  }
}

export default Line;
