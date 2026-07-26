import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import styles from "./BackButton.module.css";

// Consistent "go back" affordance for every detail / sub-page across the app.
export default function BackButton({ label = "رجوع", to, className = "" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
    else navigate(-1);
  };

  return (
    <button type="button" className={`${styles.backBtn} ${className}`} onClick={handleClick}>
      <FiArrowRight />
      <span>{label}</span>
    </button>
  );
}
