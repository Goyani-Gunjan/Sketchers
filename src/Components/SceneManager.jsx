// import * as THREE from "three";

// class SceneManager {
//     constructor(canvasRef) {
//         this.scene = new THREE.Scene();
//         this.scene.background = new THREE.Color(0x444444); // Dark gray for visibility

//         this.camera = this.initCamera();
//         this.renderer = this.initRenderer(canvasRef);

//         if (!this.renderer) {
//             console.error("Renderer failed to initialize.");
//             return;
//         }

//         this.plane = this.createPlane();
//         if (!this.plane) {
//             console.error("Plane creation failed.");
//             return;
//         }

//         this.scene.add(this.plane);
//         console.log("✅ Plane added to scene:", this.plane);

//         this.addLighting(); // Add lights

//         this.animate();
//     }

//     initCamera() {
//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         camera.position.set(0, 200, 0); // Moved up for better view
//         camera.lookAt(0, 0, 0);
//         console.log("✅ Camera initialized:", camera);
//         return camera;
//     }

//     initRenderer(canvasRef) {
//         if (!canvasRef.current) {
//             console.error("❌ CanvasRef is null!");
//             return null;
//         }

//         const renderer = new THREE.WebGLRenderer({ antialias: true });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         renderer.setPixelRatio(window.devicePixelRatio);
//         renderer.shadowMap.enabled = true;
        
//         console.log("✅ Renderer initialized:", renderer);
//         canvasRef.current.appendChild(renderer.domElement);
        
//         return renderer;
//     }

//     createPlane() {
//         const geometry = new THREE.PlaneGeometry(500, 500);
//         const material = new THREE.MeshBasicMaterial({
//             color: "blue",
//             side: THREE.DoubleSide,    wireframe: true 
//         });

//         const plane = new THREE.Mesh(geometry, material);
//         plane.rotation.x = -Math.PI / 2;
//         plane.position.set(0, 0, 0);
        
//         console.log("✅ Plane created:", plane);
//         return plane;
//     }

//     addLighting() {
//         const light = new THREE.DirectionalLight(0xffffff, 1);
//         light.position.set(0, 500, 500);
//         this.scene.add(light);
//         console.log("✅ Light added:", light);
//     }

//     animate() {
//         const animate = () => {
//             requestAnimationFrame(animate);
//             this.renderer.render(this.scene, this.camera);
//         };
//         animate();
//     }
// }

// export default SceneManager;
