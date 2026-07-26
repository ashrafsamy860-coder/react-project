import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiBookOpen,
  FiUsers,
  FiDollarSign,
  FiAward,
  FiClipboard,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { useApp } from "../../context/AppContext";
import styles from "./Sidebar.module.css";

const mainLinks = [
  { to: "/", label: "نظرة عامة", icon: <FiGrid /> },
  { to: "/courses", label: "دوراتي", icon: <FiBookOpen /> },
  { to: "/students", label: "الطلاب", icon: <FiUsers /> },
  { to: "/profits", label: "الأرباح", icon: <FiDollarSign /> },
  { to: "/certificates", label: "الشهادات", icon: <FiAward /> },
  { to: "/assignments", label: "التكليفات", icon: <FiClipboard /> },
  { to: "/profile", label: "الملف الشخصي", icon: <FiUser /> },
];

export default function Sidebar({ mobileOpen, onClose }) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const { notify } = useApp();

  const handleLogout = () => {
    setLogoutOpen(false);
    notify("تم تسجيل الخروج بنجاح");
    navigate("/");
  };

  return (
    <>
      {mobileOpen && <div className={styles.backdrop} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.open : ""}`}>
        <div className={styles.logo}>
          <span className={styles.logoOrange}>EG</span>
          <span className={styles.logoNavy}>C</span>
        </div>

        <nav className={styles.nav}>
          <ul>
            {mainLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
                  onClick={onClose}
                >
                  <span className={styles.icon}>{link.icon}</span>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.bottomNav}>
          <NavLink to="/settings" className={styles.link} onClick={onClose}>
            <span className={styles.icon}>
              <FiSettings />
            </span>
            الإعدادات
          </NavLink>
          <button className={styles.link} onClick={() => setLogoutOpen(true)}>
            <span className={styles.icon}>
              <FiLogOut />
            </span>
            تسجيل خروج
          </button>
        </div>
      </aside>

      <Modal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="تسجيل الخروج"
        footer={
          <>
            <Button variant="ghost" onClick={() => setLogoutOpen(false)}>
              إلغاء
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              تسجيل الخروج
            </Button>
          </>
        }
      >
        هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟
      </Modal>
    </>
  );
}
