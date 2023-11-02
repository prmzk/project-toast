import React, { useCallback, useContext, useEffect } from "react";
import { X } from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import { ToastContext } from "../ToastProvider/ToastProvider";
import styles from "./Toast.module.css";
import ToastIcon from "./ToastIcon";

const TOAST_EXIT_ANIMATION_DURATION = 500;
const TOAST_ENTER_ANIMATION_DURATION = 800;

function Toast({ toastProp: { message, variantSelected, id, aliveTime = 0 } }) {
  const { setToasts } = useContext(ToastContext);

  const closeToast = useCallback(() => {
    // Toggle a willClose property on the toast to trigger the exit animation
    setToasts((prev) => {
      const newToasts = [...prev];
      const index = newToasts.map((toast) => toast.id).indexOf(id);
      newToasts[index]["willClose"] = true;
      return newToasts;
    });

    // Remove the toast when the exit animation is finished
    setTimeout(() => {
      setToasts((prev) => {
        const newToasts = prev.filter((toast) => toast.id !== id);
        return newToasts;
      });
    }, TOAST_EXIT_ANIMATION_DURATION);
  }, [setToasts, id]);

  useEffect(() => {
    // Close toast after "aliveTime" amount of time
    if (aliveTime > 0) {
      const timeout = setTimeout(() => {
        closeToast();
      }, aliveTime + TOAST_ENTER_ANIMATION_DURATION);

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
        <ToastIcon variantSelected={variantSelected} size={24} />
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
