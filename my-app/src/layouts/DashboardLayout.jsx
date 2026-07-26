import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Toast from "../components/Toast/Toast";
import styles from "./DashboardLayout.module.css";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className={styles.main}>
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
      <Toast />
    </div>
  );
}
