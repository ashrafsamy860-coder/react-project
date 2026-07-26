import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiMenu, FiSearch, FiCheckCircle, FiFileText, FiUser, FiBookOpen, FiChevronDown } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import Dropdown from "../Dropdown/Dropdown";
import SafeImage from "../SafeImage/SafeImage";
import styles from "./Navbar.module.css";

const TYPE_ICON = {
  course: <FiBookOpen />,
  student: <FiUser />,
  assignment: <FiFileText />,
};

export default function Navbar({ onMenuClick }) {
  const { user, notifications, unreadNotificationsCount, markAllNotificationsRead, searchAll } = useApp();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const results = searchAll(query);

  return (
    <header className={styles.navbar}>
      <button className={styles.menuBtn} onClick={onMenuClick} aria-label="فتح القائمة">
        <FiMenu />
      </button>

      <div className={styles.searchSlot}>
        <Dropdown
          trigger={() => (
            <div className={styles.searchWrap}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="ابحث عن دورة، طالب، أو تكليف..."
                className={styles.searchInput}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          )}
          align="end"
          panelClassName={styles.searchPanel}
        >
          {(close) => (
            <div className={styles.searchResults}>
              {query.trim() === "" ? (
                <p className={styles.searchEmpty}>ابدأ بالكتابة للبحث في الدورات، الطلاب، والتكليفات</p>
              ) : results.length === 0 ? (
                <p className={styles.searchEmpty}>لا توجد نتائج مطابقة لـ «{query}»</p>
              ) : (
                results.map((r, i) => (
                  <button
                    key={i}
                    className={styles.searchItem}
                    onClick={() => {
                      navigate(r.to);
                      setQuery("");
                      close();
                    }}
                  >
                    <span className={styles.searchItemIcon}>{TYPE_ICON[r.type]}</span>
                    <span className={styles.searchItemBody}>
                      <span className={styles.searchItemLabel}>{r.label}</span>
                      <span className={styles.searchItemSub}>{r.sub}</span>
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </Dropdown>
      </div>

      <div className={styles.divider} />

      <div className={styles.right}>
        <Dropdown
          trigger={() => (
            <button className={styles.bellBtn} aria-label="الإشعارات">
              <FiBell />
              {unreadNotificationsCount > 0 && <span className={styles.badge}>{unreadNotificationsCount}</span>}
            </button>
          )}
          panelClassName={styles.notifPanel}
        >
          {(close) => (
            <div>
              <div className={styles.notifHeader}>
                <span>الإشعارات</span>
                <button onClick={markAllNotificationsRead}>
                  <FiCheckCircle /> تحديد الكل كمقروء
                </button>
              </div>
              <div className={styles.notifList}>
                {notifications.length === 0 ? (
                  <p className={styles.searchEmpty}>لا توجد إشعارات جديدة</p>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className={`${styles.notifItem} ${!n.read ? styles.notifUnread : ""}`}>
                      <p>{n.text}</p>
                      <span>{n.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </Dropdown>

        <Dropdown
          trigger={(open) => (
            <button className={`${styles.profile} ${open ? styles.profileActive : ""}`}>
              <span className={styles.avatarRing}>
                <SafeImage src={user.avatar} alt={user.name} fallbackSeed={user.name} className={styles.avatar} />
                <span className={styles.onlineDot} />
              </span>
              <div className={styles.info}>
                <span className={styles.name}>{user.name}</span>
                <span className={styles.role}>{user.role}</span>
              </div>
              <FiChevronDown className={styles.profileChevron} />
            </button>
          )}
          align="end"
          panelClassName={styles.profilePanel}
        >
          {(close) => (
            <div className={styles.profileMenu}>
              <button
                onClick={() => {
                  navigate("/profile");
                  close();
                }}
              >
                <FiUser /> الملف الشخصي
              </button>
              <button
                onClick={() => {
                  navigate("/settings");
                  close();
                }}
              >
                <FiFileText /> الإعدادات
              </button>
            </div>
          )}
        </Dropdown>
      </div>
    </header>
  );
}
