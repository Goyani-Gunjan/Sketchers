import * as THREE from "three";
import ShapeStore from "../Store/ShapeStore"; // Import shapeStore

class Line {
    constructor(scene) {
    this.scene = scene;
    this.drawing = false;
    this.line = null;
    this.spheres = []; // Store sphere references
    this.startPoint = null;
    this.endPoint = null;
  }

  startDrawing(startPoint) {

    this.startPoint = startPoint.clone(); // Store start point
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
    if (!this.line) return;

    const points = this.line.geometry.attributes.position.array;
    points[3] = endPoint.x;
    points[4] = endPoint.y;
    points[5] = endPoint.z;
    this.line.geometry.attributes.position.needsUpdate = true;


    this.endPoint = endPoint.clone(); // Update end point
  }

  stopDrawing() {
    if (!this.line) return;
    this.drawing = false;
  
    // Add Sphere at End Point
      const endPoint = new THREE.Vector3(
        this.line.geometry.attributes.position.array[3],
        this.line.geometry.attributes.position.array[4],
        this.line.geometry.attributes.position.array[5]
      );
      this.endPoint = endPoint; // Store final end point
      this.addSphere(endPoint);

        // Save the shape to shapeStore
    this.saveShape();
    
  }

  addSphere(position) {
    const geometry = new THREE.SphereGeometry(1.5, 16, 16); // Sphere size
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.copy(position);
    this.scene.add(sphere);
    this.spheres.push(sphere);
  }

  saveShape() {
    if (this.startPoint && this.endPoint) {
      ShapeStore.addToHistory({
        type: "Line",
        start: this.startPoint,
        end: this.endPoint,
        shapeObject: this.line,
        spheres : this.spheres,
      });
    }
  }
}

export default Line;
