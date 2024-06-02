import React from "react";
const CurrentTempChangeUnitContext = React.createContext({
  currentTemperatureUnit: "",
  handleToggleSwitchChange: () => {},
});
export default CurrentTempChangeUnitContext;
