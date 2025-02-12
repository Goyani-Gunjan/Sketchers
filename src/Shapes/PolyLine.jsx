import * as THREE from "three";

class PolyLine {
  constructor(scene) {
    this.scene = scene;
    this.drawing = false;
    this.points = [];
    this.line = null;
    this.spheres = []; // Store sphere references
    this.material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    this.tempLine = null; // Store the temporary preview line
    this.lastPoint = null; // Last added point reference
  }

  handleClick(point) {
    if (!this.drawing) {
      // 🟢 Start new polyline
      this.drawing = true;
      this.points = [point.clone()];
      this.addSphere(point); // Add sphere at the first point
    } 

    // 🟡 Add new point on each click
    this.points.push(point.clone());
    this.addSphere(point); // Add sphere at each new point
    this.lastPoint = point.clone(); // Store last point for preview

    // Remove temp preview line when adding a new point
    if (this.tempLine) {
      this.scene.remove(this.tempLine);
      this.tempLine.geometry.dispose();
      this.tempLine = null;
    }

    // Update the line
    this.updateDrawing();
  }

  updateDrawing() {
    if (this.points.length < 2) return; // Need at least 2 points to draw a line

    if (this.line) {
      this.scene.remove(this.line); // Remove previous line before updating
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(this.points);
    this.line = new THREE.Line(geometry, this.material);
    this.scene.add(this.line);
  }

  handleMouseMove(point) {
    if (!this.drawing || !this.lastPoint) return;

    // 🚀 POLYLINE PREVIEW: Draws a temporary segment to mouse position
    if (!this.tempLine) {
      // Create temp line
      const tempMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 });
      const tempGeometry = new THREE.BufferGeometry().setFromPoints([this.lastPoint, point]);
      this.tempLine = new THREE.Line(tempGeometry, tempMaterial);
      this.scene.add(this.tempLine);
    } else {
      // Update temp line
      this.tempLine.geometry.setFromPoints([this.lastPoint, point]);
    }
  }

  stopDrawing() {
    this.drawing = false;
    this.lastPoint = null; // Reset preview point

    // Remove temporary line on double-click
    if (this.tempLine) {
      this.scene.remove(this.tempLine);
      this.tempLine.geometry.dispose();
      this.tempLine = null;
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

export default PolyLine;
