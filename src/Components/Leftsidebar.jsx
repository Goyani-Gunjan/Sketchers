import { FaSearch } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { GoEye } from "react-icons/go";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import GeometryList from "./GeometryList";
import { TbLine , TbOvalVertical } from "react-icons/tb";
import { GoCircle } from "react-icons/go";
import { MdOutlineUploadFile } from "react-icons/md";

// eslint-disable-next-line react/prop-types
function Leftsidebar({setSelectedShape}) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  
  

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleShapeClick = (shape) => {
    console.log("Shape selected:", shape);  // 🔴 Debugging log
    setSelectedShape(shape);
  };

  return (
    <div className=" min-h-screen  bg-gray-100  border-0 rounded-lg w-[350px] h-screen z-20
     mt-10 ml-4 ">
      <div className="flex  justify-between items-center mt-3 ml-2 mr-2 ">
        <div className="text-xl">List of created Object</div>
        <button>
          <FaSearch />
        </button>
      </div>
      <hr className="h-px mt-3 bg-gray-300 border-0 "></hr>

      <div className="flex justify-between bg-white mt-4 ml-2 w-[335px] rounded-lg ">
        <div className="flex">
          <button className="text-3xl" onClick={toggleDropdown}>
            <RiArrowDropDownLine />
          </button>
          <div className="text-lg">My file 1</div>
        </div>
        <div className="">
          <button className="text-2xl mr-2">
            <GoEye />
          </button>
          <button className="text-2xl mr-2">
            <RiDeleteBin5Line />
          </button>
        </div>
      </div>

      {/* Dropdown content */}
      {isDropdownVisible && (
     
      <>
           <GeometryList  type={TbLine} title={"line"} classes="flex ml-5 mt-3 " onClick={() => handleShapeClick("Line")} />
           <GeometryList  type={GoCircle} title={"Circle"} classes="flex ml-5 mt-3 "  onClick={() => setSelectedShape("Circle")} />
           <GeometryList  type={TbOvalVertical} title={"Ellipse"} classes="flex ml-5 mt-3 " onClick={() => setSelectedShape("Ellipse")}  />
           <GeometryList  type={MdOutlineUploadFile} title={"Polyline"} classes="flex ml-5 mt-3 " />
      </>
      )}
    </div> 
  );
}

export default Leftsidebar;
