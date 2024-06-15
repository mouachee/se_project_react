import { useEffect } from "react";

const useEscape = (onEscape) => {
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
export default useEscape;
