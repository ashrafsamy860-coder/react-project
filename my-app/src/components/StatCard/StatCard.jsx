import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FiClipboard,
  FiCheckCircle,
  FiEdit3,
  FiBookOpen,
  FiUsers,
  FiUserCheck,
  FiUserPlus,
  FiAward,
  FiDollarSign,
  FiTrendingUp,
  FiStar,
  FiAlertTriangle,
} from "react-icons/fi";
import styles from "./StatCard.module.css";

// Maps the `icon`/`id` string coming from mock data to a real icon
// component + a themed accent color, so every stat card looks distinct
// instead of reusing one generic clipboard icon everywhere.
const ICON_MAP = {
  "clipboard-alert": { icon: <FiAlertTriangle />, color: "danger" },
  "clipboard-check": { icon: <FiCheckCircle />, color: "success" },
  "clipboard-edit": { icon: <FiEdit3 />, color: "warning" },
  clipboard: { icon: <FiClipboard />, color: "primary" },
  courses: { icon: <FiBookOpen />, color: "primary" },
  active: { icon: <FiUserCheck />, color: "success" },
  new: { icon: <FiUserPlus />, color: "warning" },
  completed: { icon: <FiAward />, color: "success" },
  rating: { icon: <FiStar />, color: "warning" },
  revenue: { icon: <FiDollarSign />, color: "success" },
  total: { icon: <FiTrendingUp />, color: "primary" },
  pending: { icon: <FiEdit3 />, color: "warning" },
  month: { icon: <FiTrendingUp />, color: "primary" },
  withdrawn: { icon: <FiCheckCircle />, color: "success" },
  issued: { icon: <FiAward />, color: "success" },
  students: { icon: <FiUsers />, color: "primary" },
};

// Animates a numeric value counting up from 0 on mount. Non-numeric values
// (already-formatted strings like "312,600 ج.م") render as-is, since
// there's nothing to visually count up.
function useCountUp(value) {
  const numeric = typeof value === "number" ? value : NaN;
  const isAnimatable = !Number.isNaN(numeric);
  const [display, setDisplay] = useState(isAnimatable ? 0 : value);
  const frameRef = useRef();

  useEffect(() => {
    if (!isAnimatable) {
      setDisplay(value);
      return;
    }
    const duration = 700;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(numeric * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [numeric, isAnimatable, value]);

  return display;
}

export default function StatCard({ label, value, icon, id }) {
  const mapped = ICON_MAP[icon] || ICON_MAP[id] || { icon: <FiClipboard />, color: "primary" };
  const display = useCountUp(value);

  return (
    <motion.div
      className={`${styles.card} ${styles[`accent_${mapped.color}`]}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.iconWrap}>{mapped.icon}</div>
      <div className={styles.value}>{display}</div>
      <div className={styles.label}>{label}</div>
    </motion.div>
  );
}
