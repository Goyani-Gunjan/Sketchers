import Line from "./Line";
import Circle from "./Circle";

class ShapeFactory {
  static createShape(type, scene) {
    switch (type) {
      case "Line":
        return new Line(scene);
      case "Circle":
        return new Circle(scene);
      default:
        return null;
    }
  }
}

export default ShapeFactory;

