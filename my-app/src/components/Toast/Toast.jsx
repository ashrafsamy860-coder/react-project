import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import styles from "./Toast.module.css";

export default function Toast() {
  const { toast } = useApp();

  return (
    <div className={styles.wrap}>
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            className={`${styles.toast} ${toast.type === "danger" ? styles.danger : styles.success}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {toast.type === "danger" ? <FiAlertCircle /> : <FiCheckCircle />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
