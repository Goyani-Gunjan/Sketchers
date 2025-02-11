import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import ShapeFactory from '../Shapes/ShapeFactory'



// eslint-disable-next-line react/prop-types
const CanvasArea = ({ drawShapes}) => {

    const canvasRef = useRef(null);
    const sceneRef = useRef(new THREE.Scene());
    const rendererRef = useRef(null);
    const raycaster = useRef(new THREE.Raycaster());
    const mouse = useRef(new THREE.Vector2());
    const planeRef = useRef(null);
    const cameraRef = useRef(null);
    const [shape, setShape] = useState(null);

    useEffect(() => {
        const scene = sceneRef.current;

        // Setup Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 100 , 0);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        rendererRef.current = renderer;

        // Plane for Raycasting
        const planeGeometry = new THREE.PlaneGeometry(5000, 5000);
        const planeMaterial = new THREE.MeshBasicMaterial({ color: 'white', side: THREE.DoubleSide });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);
        planeRef.current = plane;

    

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            if (rendererRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
              }
        };
        animate();

        // Mouse Events
        const handleMouseDown = (event) => {
  
            if(!drawShapes) return ;

            const rect = renderer.domElement.getBoundingClientRect();
            mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.current.setFromCamera(mouse.current, camera);

            const intersects = raycaster.current.intersectObject(planeRef.current);
            if (intersects.length > 0) {
                const point = intersects[0].point.clone();
                point.y += 0.1;
                shape.startDrawing(point);
            }
        };

        

        const handleMouseMove = (event) => {
            if (!shape || !shape.drawing) return;

            const rect = renderer.domElement.getBoundingClientRect();
            mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.current.setFromCamera(mouse.current, camera);

            const intersects = raycaster.current.intersectObject(planeRef.current);
            if (intersects.length > 0) {
                shape.updateDrawing(intersects[0].point.clone());
              }
        };

        const handleMouseUp = () => {
            if (shape) shape.stopDrawing();
        };

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [drawShapes , shape]);

    useEffect(() => {
        if (drawShapes) {
            if (rendererRef.current) {
                rendererRef.current.state.reset(); // 🔥 Fix WebGL errors when switching
              }
          setShape(ShapeFactory.createShape(drawShapes, sceneRef.current));
        }
      }, [drawShapes]);


    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default CanvasArea;
// import { useRef, useEffect, useState } from "react";
// import * as THREE from "three";
// import ShapeFactory from '../Shapes/ShapeFactory'
// import InteractionManager from './InteractionManager'
// import ScerneManager from './SceneManager'
// class SceneManager {
//     constructor(canvasRef){
//         this.scene = new THREE.Scene();
//         this.camera = this.initCamera();
//         this.renderer = this.initRenderer(canvasRef);
//         this.plane = this.createPlane();
//         this.scene.add(this.plane);
//     }

//     initCamera(){
//         const camera = new THREE.PerspectiveCamera(75 , window.innerWidth/window.innerHeight , 0.1 , 1000);
//         camera.position.set(0 , 100 ,0);
//         camera.lookAt(0 ,0 ,0)
//         return camera;
//     }
 
//     initRenderer(canvasRef){
//         const renderer = new THREE.WebGLRenderer()
//         renderer.setSize(window.innerWidth , window.innerHeight);
//         renderer.setPixelRatio(window.devicePixelRatio);
//         canvasRef.current.appendChild(renderer.domElement);
//         return renderer;
//     }

//      createPlane(){
//         const planGeometry = new THREE.PlaneGeometry(5000 , 5000);
//         const planMaterial = new THREE.MeshBasicMaterial({color : "white" , side:THREE.DoubleSide})
//         const plane = new THREE.Mesh(planGeometry , planMaterial);
//         plane.rotation.x = -Math.PI/2;
//         return plane;
//      }

//        render() {
//     this.renderer.render(this.scene, this.camera);
//   }
// }

// class InteractionManager {
//     constructor(sceneManager, shapeFactory) {
//         this.sceneManager = sceneManager;
//         this.shapeFactory = shapeFactory;
//         this.shape = null;
//         this.raycaster = new THREE.Raycaster();
//         this.mouse = new THREE.Vector2();
//         this.initEvents();
//       }

//       initEvents() {
//         window.addEventListener("mousedown", this.handleMouseDown);
//         window.addEventListener("mousemove", this.handleMouseMove);
//         window.addEventListener("mouseup", this.handleMouseUp);
//       }

//       handleMouseDown = (event) => {
//         if (!this.shapeFactory.selectedShape) return;
    
//         const { renderer, camera, plane } = this.sceneManager;
//         const rect = renderer.domElement.getBoundingClientRect();
//         this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//         this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
//         this.raycaster.setFromCamera(this.mouse, camera);
    
//         const intersects = this.raycaster.intersectObject(plane);
//         if (intersects.length > 0) {
//           const point = intersects[0].point.clone();
//           point.y += 0.1;
//           this.shape.startDrawing(point);
//         }
//       };

//       handleMouseMove = (event) => {
//         if (!this.shape || !this.shape.drawing) return;
    
//         const { renderer, camera, plane } = this.sceneManager;
//         const rect = renderer.domElement.getBoundingClientRect();
//         this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//         this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
//         this.raycaster.setFromCamera(this.mouse, camera);
    
//         const intersects = this.raycaster.intersectObject(plane);
//         if (intersects.length > 0) {
//           this.shape.updateDrawing(intersects[0].point.clone());
//         }
//       };

//       handleMouseUp = () => {
//         if (this.shape) this.shape.stopDrawing();
//       };


//   setShape(shapeType) {
//     this.shape = ShapeFactory.createShape(shapeType, this.sceneManager.scene);
//   }
// }


// const CanvasArea = ({drawShapes}) => {
//     const canvasRef = useRef(null);
//     const[sceneManager , setSceneManager] = useState(null);
//     const [interactionManager , setInteractionManager] = useState(null);
//     const shapeFactory = useRef(new ShapeFactory());

//     useEffect(()=>{
//         const sm = new SceneManager(canvasRef);
//         const im = new InteractionManager(sm , shapeFactory.current);
//         setSceneManager(sm);
//         setInteractionManager(im);

//         const animate = () => {
//             requestAnimationFrame(animate);
//             sm.render();
//         };
//         animate();

//         return () => {
//             window.removeEventListener("mousedown", im.handleMouseDown);
//             window.removeEventListener("mousemove", im.handleMouseMove);
//             window.removeEventListener("mouseup", im.handleMouseUp);
//           };
//     } ,[]);

//     useEffect(() =>{
//         if(interactionManager){
//             interactionManager.setShape(drawShapes);
//         } 
//     }, [drawShapes , interactionManager]);
 
//     return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;

// }

// export default CanvasArea;

// import { useRef, useEffect, useState } from "react";
// import SceneManager from "./SceneManager";
// import InteractionManager from "./InteractionManager";
// import ShapeFactory from "../Shapes/ShapeFactory";

// const CanvasArea = ({ drawShape }) => {
//   const canvasRef = useRef(null);
//   const [sceneManager, setSceneManager] = useState(null);
//   const [interactionManager, setInteractionManager] = useState(null);

//   useEffect(() => {

//     console.log("Canvas Ref:", canvasRef.current);
//     const sm = new SceneManager(canvasRef);
//     const im = new InteractionManager(sm);
//     setSceneManager(sm);
//     setInteractionManager(im);

//     const animate = () => {
//       requestAnimationFrame(animate);
    
//     };
//     animate();
//   }, []);
  
//   useEffect(() => {
//     if (interactionManager && sceneManager) {
//       interactionManager.setShape(ShapeFactory.createShape(drawShape, sceneManager.scene));
//     }
//   }, [drawShape, interactionManager, sceneManager]);

//   return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
// };

// export default CanvasArea;
