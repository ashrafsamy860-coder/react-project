import React from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import styles from "./Pagination.module.css";

export default function Pagination({ page, totalPages, onChange, totalItems, pageSize }) {
  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  const getPages = () => {
    const pages = [];
    const last = totalPages;
    for (let p = 1; p <= last; p++) {
      if (p === 1 || p === last || Math.abs(p - page) <= 1) pages.push(p);
      else if (pages[pages.length - 1] !== "...") pages.push("...");
    }
    return pages;
  };

  if (totalPages <= 0) return null;

  return (
    <div className={styles.wrap}>
      <span className={styles.info}>
        عرض البيانات من {from} إلى {to} من أصل {totalItems}
      </span>
      <div className={styles.controls}>
        <button
          className={styles.navBtn}
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          aria-label="السابق"
        >
          <FiChevronRight />
        </button>
        {getPages().map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className={styles.dots}>
              ...
            </span>
          ) : (
            <button
              key={p}
              className={`${styles.pageBtn} ${p === page ? styles.active : ""}`}
              onClick={() => onChange(p)}
            >
              {p}
            </button>
          )
        )}
        <button
          className={styles.navBtn}
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
          aria-label="التالي"
        >
          <FiChevronLeft />
        </button>
      </div>
    </div>
  );
}
