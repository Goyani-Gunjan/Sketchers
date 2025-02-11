// import * as THREE from "three";

// class InteractionManager {
//   constructor(sceneManager) {
//     this.sceneManager = sceneManager;
//     this.shape = null;
//     this.raycaster = new THREE.Raycaster();
//     this.mouse = new THREE.Vector2();
//     this.isDrawing = false; // Track drawing state
//     this.initEvents();
//   }
//   initEvents() {
//     window.addEventListener("mousedown", (event) => this.handleMouseDown(event));
//     window.addEventListener("mousemove", (event) => this.handleMouseMove(event));
//   }

//   handleMouseDown = (event) => {
//     if (!this.shape) return;

//     const { renderer, camera, plane } = this.sceneManager;
//     const rect = renderer.domElement.getBoundingClientRect();
//     this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//     this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
//     this.raycaster.setFromCamera(this.mouse, camera);

//     const intersects = this.raycaster.intersectObject(plane);
//     if (intersects.length > 0) {
//       const point = intersects[0].point.clone();
//       point.y += 0.1;

//       if (!this.isDrawing) {
//         this.shape.startDrawing(point);
//         this.isDrawing = true;
//       } else {
//         this.shape.stopDrawing(point);
//         this.isDrawing = false;
//       }
//     }
//   };

//   handleMouseMove = (event) => {
//     if (!this.shape || !this.shape.drawing) return;

//     const { renderer, camera, plane } = this.sceneManager;
//     const rect = renderer.domElement.getBoundingClientRect();
//     this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//     this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
//     this.raycaster.setFromCamera(this.mouse, camera);

//     const intersects = this.raycaster.intersectObject(plane);
//     if (intersects.length > 0) {
//       this.shape.updateDrawing(intersects[0].point.clone());
//     }
//   };

//   setShape(shapeType) {
//     this.shape = shapeType;
//   }
// }

// export default InteractionManager;
