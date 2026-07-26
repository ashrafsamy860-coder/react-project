import React from "react";
import { FiFilter, FiSearch, FiChevronDown } from "react-icons/fi";
import styles from "./FilterBar.module.css";

export default function FilterBar({ statusFilter, onStatusChange, search, onSearchChange, statusOptions }) {
  return (
    <div className={styles.bar}>
      <button className={styles.filterBtn} type="button">
        <FiFilter />
        تحديد بيانات
      </button>

      <div className={styles.selectWrap}>
        <select
          className={styles.select}
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all">جميع الحالات</option>
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <FiChevronDown className={styles.chevron} />
      </div>

      <div className={styles.searchWrap}>
        <input
          type="text"
          placeholder="بحث بعنوان الدورة أو اسم الطالب..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
        <FiSearch className={styles.searchIcon} />
      </div>
    </div>
  );
}
