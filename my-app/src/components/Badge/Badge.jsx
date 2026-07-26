import React from "react";
import styles from "./Badge.module.css";

const COLOR_CLASS = {
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
  neutral: styles.neutral,
};

export default function Badge({ label, color = "neutral", className = "" }) {
  return <span className={`${styles.badge} ${COLOR_CLASS[color] || styles.neutral} ${className}`}>{label}</span>;
}
