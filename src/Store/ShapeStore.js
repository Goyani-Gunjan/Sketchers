import { makeAutoObservable, observable  } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { toJS } from "mobx";

class ShapeStore {
  drawShapes = null;
  currentShape = null;
  clickCount = 0;
  canDraw = false;
  isPolylineDrawing = false;
  scene = null;
  shapesHistory = [];

  constructor() {
    makeAutoObservable(this, {
      shapesHistory: observable,
    
    });
  }

 setScene(scene) {
  this.scene = scene
 }
  setDrawShapes(shape) {
    this.drawShapes = shape;
  }

  setCurrentShape(shape) {
    this.currentShape = shape;
    if (shape) {
      this.addToHistory(shape);
    }
  }

  setClickCount(count) {
    this.clickCount = count;
  }

  setCanDraw(value) {
    this.canDraw = value;
  }

  setIsPolylineDrawing(value) {
    this.isPolylineDrawing = value;
  }

  addToHistory(shape) {
    if (!shape || !shape.type) return; // Prevent invalid entries
  
    const shapeData = {
      id: uuidv4(),
      type: shape.type,
      title: shape.type,
      shapeObject: shape.shapeObject, // Store the THREE.js object
      sphere : shape.spheres
    };
  
    if (shape.type === "Line") {
      shapeData.startPoint = { x: shape.start.x, y: shape.start.y, z: shape.start.z };
      shapeData.endPoint = { x: shape.end.x, y: shape.end.y, z: shape.end.z };
    } else if (shape.type === "Circle") {
      shapeData.center = { x: shape.center.x, y: shape.center.y, z: shape.center.z };
      shapeData.radius = shape.radius;
    }else if (shape.type === "Ellipse") {
      shapeData.center = { x: shape.center.x, y: shape.center.y, z: shape.center.z };
      shapeData.majorAxis = shape.majorAxis;
      shapeData.minorAxis = shape.minorAxis;
    }else if (shape.type === "PolyLine") {
      shapeData.points = shape.points; // Store all polyline points
    }
  
    this.shapesHistory.push(shapeData);
    console.log(`${shape.type} added to history:`, shapeData);
    console.log("his" , toJS(this.shapesHistory))
  }
  

  removeShape(id) {
   
    const shapeDelete = this.shapesHistory.find(shape => shape.id === id);
   if(shapeDelete){
     if(shapeDelete.shapeObject){
       this.scene.remove(shapeDelete.shapeObject);
     }
     if (shapeDelete.shapeObject.geometry) {
      shapeDelete.shapeObject.geometry.dispose();
    }
    if (shapeDelete.shapeObject.material) {
      shapeDelete.shapeObject.material.dispose();
    }

     // Remove the spheres if they exist
     if (shapeDelete.sphere && Array.isArray(shapeDelete.sphere)) {
      shapeDelete.sphere.forEach(sphere => {
        this.scene.remove(sphere);

        // Dispose of sphere geometry and material
        if (sphere.geometry) {
          sphere.geometry.dispose();
        }
        if (sphere.material) {
          sphere.material.dispose();
        }
      });
    }
    this.shapesHistory = this.shapesHistory.filter(shape => shape.id !== id);
   }


  }

  visible(id) {
    const shapeVisible = this.shapesHistory.find(shape => shape.id === id);
  
    if (shapeVisible) {
      // Toggle shapeObject visibility
      shapeVisible.shapeObject.visible = !shapeVisible.shapeObject.visible;
  
      // Toggle spheres visibility properly
      if (shapeVisible.sphere && Array.isArray(shapeVisible.sphere)) {
        shapeVisible.sphere.forEach(sphere => {
          sphere.visible = shapeVisible.shapeObject.visible; // Match sphere visibility to line
        });
      }
    }
  }


  

 
  
  
  
  
}


export default new ShapeStore();