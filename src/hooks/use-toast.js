import { useContext } from "react";
import { ToastContext } from "../components/ToastProvider";

const useToast = () => {
  const { setToasts } = useContext(ToastContext);
  const addToast = (newToast) => setToasts((prev) => [...prev, newToast]);

  return addToast;
};

export default useToast;
