import { useState } from "react";
// import { observer } from "mobx-react-lite"; 
// import ShapeStore from "../Store/ShapeStore";
function ColorSelection() {

    const [selectedColor, setSelectedColor] = useState("#FF0000"); // Default Red
    const [opacity, setOpacity] = useState(100); // Default 100%

    const hexToRgb = (hex) => {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `RGB (${r}, ${g}, ${b})`;
      };

  return (
    <>    {/* Color Picker */}
    <div className="mt-4 w-80">
         <h3 className="text-md font-semibold text-gray-700 mb-2">Color</h3>
     <div className="flex items-center">
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
        className="w-10 h-10  cursor-pointer"
      />
      <span className="ml-2 text-gray-700">{hexToRgb(selectedColor)}</span>
      <input
        type="number"
        value={opacity}
        onChange={(e) => setOpacity(e.target.value)}
        className="ml-auto w-15 border p-1 rounded-md text-center"
      />
      <div className="ml-2">%</div>
      </div>
 </div>
 </>

  )
}

export default ColorSelection