import React, { createContext, useMemo, useState } from "react";

export const ToastContext = createContext({
  toasts: [],
  setToasts: () => {},
});

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const value = useMemo(() => {
    return {
      setToasts,
      toasts,
    };
  }, [toasts]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
