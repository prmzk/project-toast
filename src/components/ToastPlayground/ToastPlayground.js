import React, { useState } from "react";

import Button from "../Button";

import useToast from "../../hooks/use-toast";
import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const toast = useToast();
  const [variantSelected, setVariantSelected] = useState("notice");
  const [message, setMessage] = useState("");
  const [aliveTime, setAliveTime] = useState(1);

  const handleToastSubmit = (e) => {
    e.preventDefault();
    toast({
      message,
      variantSelected,
      id: crypto.randomUUID(),
      aliveTime: aliveTime * 1000,
    });
    setMessage("");
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <form onSubmit={handleToastSubmit}>
        <div className={styles.controlsWrapper}>
          {/* MESSAGE */}
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                className={styles.messageInput}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                required
              />
            </div>
          </div>
          {/* END MESSAGE */}

          {/* ALIVE TIME */}
          <div className={styles.row}>
            <label
              htmlFor="alive-time"
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Alive Time (second)
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="alive-time"
                type="number"
                className={styles.aliveTimeInput}
                onChange={(e) => setAliveTime(e.target.value)}
                value={aliveTime}
                required
              />
            </div>
          </div>
          {/* END ALIVE TIME */}

          {/* VARIANTS */}
          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((variant, i) => (
                <label
                  htmlFor={`${i}-${variant}-notice`}
                  key={`${i}-${variant}-notice`}
                >
                  <input
                    required
                    id={`${i}-${variant}-notice`}
                    type="radio"
                    name="variant"
                    checked={variantSelected === variant}
                    value={variant}
                    onChange={(e) => setVariantSelected(e.target.value)}
                  />
                  {variant}
                </label>
              ))}
            </div>
          </div>
          {/* END VARIANTS */}

          {/* BUTTON */}
          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button type="submit">Pop Toast!</Button>
            </div>
          </div>
          {/* END BUTTON */}
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
