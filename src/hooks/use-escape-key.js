import { useEffect } from "react";

const useEscapeKey = (fn) => {
  useEffect(() => {
    const closeAllToast = ({ key }) => {
      if (key === "Escape") fn();
    };

    document.addEventListener("keydown", closeAllToast);

    return () => document.removeEventListener("keydown", closeAllToast);
  }, [fn]);
};

export default useEscapeKey;
