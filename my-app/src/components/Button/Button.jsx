import React from "react";
import styles from "./Button.module.css";

const VARIANT_CLASS = {
  primary: styles.primary,
  outline: styles.outline,
  ghost: styles.ghost,
  danger: styles.danger,
};

export default function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.btn} ${VARIANT_CLASS[variant] || styles.primary} ${
        fullWidth ? styles.fullWidth : ""
      } ${className}`}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}
