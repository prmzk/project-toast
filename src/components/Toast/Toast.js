import React, { useCallback, useContext, useEffect } from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import { ToastContext } from "../ToastProvider/ToastProvider";
import styles from "./Toast.module.css";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ toastObj: { message, variantSelected, id, aliveTime = 0 } }) {
  const { setToasts } = useContext(ToastContext);
  const Icon = variantSelected ? ICONS_BY_VARIANT[variantSelected] : Info;

  const closeToast = useCallback(() => {
    setToasts((prev) => {
      const index = prev.map((toast) => toast.id).indexOf(id);
      const newToasts = [...prev];
      newToasts[index]["willClose"] = true;
      return newToasts;
    });

    setTimeout(() => {
      setToasts((prev) => {
        const newToasts = prev.filter((toast) => toast.id !== id);
        return newToasts;
      });
    }, 500);
  }, [setToasts, id]);

  useEffect(() => {
    if (aliveTime > 0) {
      const timeout = setTimeout(() => {
        closeToast();
      }, aliveTime + 800);

      return () => clearTimeout(timeout);
    }
  }, [aliveTime, closeToast]);

  return (
    <div
      id={id}
      className={`${styles.toast} ${styles.notice} ${styles[variantSelected]}`}
    >
      <div className={styles.iconContainer}>
        <VisuallyHidden>{variantSelected}</VisuallyHidden>
        <Icon size={24} />
      </div>
      <p className={styles.content}>{message}</p>
      <button
        className={styles.closeButton}
        onClick={closeToast}
        aria-label="Dismiss message"
        aria-live="off"
      >
        <X size={24} />
        <VisuallyHidden>Dismiss message</VisuallyHidden>
      </button>
    </div>
  );
}

export default Toast;
