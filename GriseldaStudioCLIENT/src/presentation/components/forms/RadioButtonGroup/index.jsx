import style from "./RadioButtonGroup.module.css";
import { useState } from "react";

function RadioButtonGroup({valores}) {
  const [selectedColor, setSelectedColor] = useState(valores[0]);

  const handleChange = (event) => {
    setSelectedColor(event.target.value);
  };

  return (
    <div className="btn-group btn-group-sm btn-group-toggle">
      {valores.map((color) => (
        <label
          key={color}
          className={`btn btn-light fs-6 ${selectedColor === color ? "active" : ""}`}
        >
          <input
            className={`${style.radio_none}`}
            type="radio"
            name="radio_color"
            value={color}
            checked={selectedColor === color}
            onChange={handleChange}
          />
          {color}
        </label>
      ))}
    </div>
  );
}

export default RadioButtonGroup;
