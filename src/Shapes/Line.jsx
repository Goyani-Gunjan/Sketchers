import * as THREE from "three";

class Line {
  constructor(scene) {
    this.scene = scene;
    this.drawing = false;
    this.line = null;
    this.spheres = []; // Store sphere references
  }

  startDrawing(startPoint) {


    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const points = [startPoint, startPoint.clone()];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.line = new THREE.Line(geometry, material);

    this.scene.add(this.line);
    this.drawing = true;

    // Add Sphere at Start Point
    this.addSphere(startPoint);
  }

  updateDrawing(endPoint) {
    const points = this.line.geometry.attributes.position.array;
    points[3] = endPoint.x;
    points[4] = endPoint.y;
    points[5] = endPoint.z;
    this.line.geometry.attributes.position.needsUpdate = true;
  }

  stopDrawing() {
    this.drawing = false;
   console.log(this.line)
    // Add Sphere at End Point
    if (this.line) {
      const endPoint = new THREE.Vector3(
        this.line.geometry.attributes.position.array[3],
        this.line.geometry.attributes.position.array[4],
        this.line.geometry.attributes.position.array[5]
      );
      this.addSphere(endPoint);
    }
  }

  addSphere(position) {
    const geometry = new THREE.SphereGeometry(1.5, 16, 16); // Sphere size
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.copy(position);
    this.scene.add(sphere);
    this.spheres.push(sphere);
  }
}

export default Line;
