import PropTypes from "prop-types";

const PropertiesPanel = ({ shapeType }) => {

    
  let sections = [];

  if (shapeType === "Line") {
    sections = [
      { heading: "Starting Point", fields: ["X1", "Y1", "Z1"] },
      { heading: "Ending Point", fields: ["X2", "Y2", "Z2"] },
    ];
  } else if (shapeType === "Circle") {
    sections = [
      { heading: "Center", fields: ["X", "Y", "Z"] },
      { heading: "Radius", fields: ["Radius"] },
    ];
  } else if (shapeType === "Ellipse") {
    sections = [
      { heading: "Center", fields: ["X", "Y", "Z"] },
      { heading: "Radius", fields: ["RX", "RY"] },
    ];
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-80">
      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">{section.heading}</h3>
          <div className="flex flex-col">
            {section.fields.map((field, i) => (
              <div key={i} className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">{field}</label>
                <input
                  type="number"
                  className="border rounded-md p-1 w-full"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

PropertiesPanel.propTypes = {
  shapeType: PropTypes.string.isRequired,
};

export default PropertiesPanel;
