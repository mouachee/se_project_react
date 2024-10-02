import React, { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTempChangeUnitContext from "../../contexts/CurrentTempChangeUnitContext";
const ToggleSwitch = () => {
  // const [currentTempChangeUnit, handleToggleSwitchChange] = useState("C");
  // const handleChange = (e) => {
  //   if (currentTempChangeUnit === "C") handleToggleSwitchChange("F");
  //   if (currentTempChangeUnit === "F") handleToggleSwitchChange("C");
  // };
  // console.log(currentTempChangeUnit);
  const { currentTempChangeUnit, handleToggleSwitchChange } = useContext(
    CurrentTempChangeUnitContext
  );
  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTempChangeUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTempChangeUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTempChangeUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};
export default ToggleSwitch;
