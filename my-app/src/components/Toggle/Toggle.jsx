import React from "react";
import styles from "./Toggle.module.css";

export default function Toggle({ checked, onChange, label, description, disabled = false }) {
  return (
    <label className={`${styles.row} ${disabled ? styles.disabled : ""}`}>
      <button
        type="button"
        className={`${styles.track} ${checked ? styles.trackOn : ""}`}
        onClick={() => !disabled && onChange(!checked)}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
      >
        <span className={styles.dot} />
      </button>
      {(label || description) && (
        <span className={styles.text}>
          {label && <span className={styles.label}>{label}</span>}
          {description && <span className={styles.description}>{description}</span>}
        </span>
      )}
    </label>
  );
}
