import * as THREE from "three";

class Line {
  constructor(scene) {
    this.scene = scene;
    this.drawing = false;
    this.line = null;
  }

  startDrawing(startPoint) {
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const points = [startPoint, startPoint.clone()];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.line = new THREE.Line(geometry, material);

    this.scene.add(this.line);
    this.drawing = true;
  }

  updateDrawing(endPoint) {  // ✅ Renamed to a common method
    if (!this.line) return;
    const points = this.line.geometry.attributes.position.array;
    points[3] = endPoint.x;
    points[4] = endPoint.y;
    points[5] = endPoint.z;
    this.line.geometry.attributes.position.needsUpdate = true;
  }

  stopDrawing() {
    this.drawing = false;
  }
}

export default Line;
