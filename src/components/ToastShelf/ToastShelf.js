import React, { useContext } from "react";

import useEscapeKey from "../../hooks/use-escape-key";
import Toast from "../Toast/Toast";
import { ToastContext } from "../ToastProvider";
import styles from "./ToastShelf.module.css";

function ToastShelf() {
  const { toasts, setToasts } = useContext(ToastContext);
  useEscapeKey(() => setToasts([]));

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {toasts.map((toastObj) => (
        <li
          key={toastObj.id}
          className={
            toastObj.willClose
              ? styles.toastWrapperClosing
              : styles.toastWrapper
          }
        >
          <Toast toastObj={toastObj} />
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
