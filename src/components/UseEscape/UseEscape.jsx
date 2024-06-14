import { useEffect } from "react";

const UseEscape = (onEscape) => {
  useEffect(() => {
    const handleEscape = (evt) => {
      if (evt.key === "Escape") {
        onEscape();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
};
export default UseEscape;
