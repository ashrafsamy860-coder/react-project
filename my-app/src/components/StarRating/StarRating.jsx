import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./StarRating.module.css";

export default function StarRating({ value = 0, onChange, readOnly = true, max = 5 }) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div className={styles.stars}>
      {Array.from({ length: max }).map((_, i) => {
        const idx = i + 1;
        return (
          <FaStar
            key={idx}
            className={idx <= display ? styles.filled : styles.empty}
            onMouseEnter={() => !readOnly && setHover(idx)}
            onMouseLeave={() => !readOnly && setHover(0)}
            onClick={() => !readOnly && onChange && onChange(idx)}
            style={{ cursor: readOnly ? "default" : "pointer" }}
          />
        );
      })}
    </div>
  );
}
