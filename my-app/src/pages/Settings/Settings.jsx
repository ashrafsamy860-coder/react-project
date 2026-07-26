import React, { useEffect, useState } from "react";
import {
  FiGlobe,
  FiMoon,
  FiSun,
  FiShield,
  FiSmartphone,
  FiMonitor,
  FiLogOut,
  FiSave,
  FiAlertTriangle,
} from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import Button from "../../components/Button/Button";
import Toggle from "../../components/Toggle/Toggle";
import Modal from "../../components/Modal/Modal";
import styles from "./Settings.module.css";

const THEME_KEY = "egc-theme";

const defaultNotificationPrefs = [
  { id: "email", label: "إشعارات البريد الإلكتروني", description: "استلام ملخص يومي بالنشاط على بريدك الإلكتروني", enabled: true },
  { id: "push", label: "إشعارات المتصفح", description: "تنبيه فوري داخل المتصفح عند حدوث نشاط جديد", enabled: true },
  { id: "assignments", label: "تسليمات التكليفات", description: "تنبيه عند تسليم طالب لتكليف جديد", enabled: true },
  { id: "peerReview", label: "مراجعات الزملاء", description: "تنبيه عند اكتمال مراجعة زميل لتمرين", enabled: false },
  { id: "messages", label: "الرسائل والاستفسارات", description: "تنبيه عند استلام رسالة من طالب", enabled: true },
  { id: "newsletter", label: "النشرة الأسبوعية", description: "ملخص أسبوعي بأداء دوراتك وأرباحك", enabled: false },
];

const activeSessions = [
  { id: "sess-1", device: "Windows · Chrome", icon: "desktop", location: "القاهرة، مصر", lastActive: "الآن", current: true },
  { id: "sess-2", device: "iPhone 14 · Safari", icon: "mobile", location: "الإسكندرية، مصر", lastActive: "منذ ساعتين", current: false },
  { id: "sess-3", device: "macOS · Chrome", icon: "desktop", location: "الجيزة، مصر", lastActive: "منذ يومين", current: false },
];

export default function Settings() {
  const { notify } = useApp();

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(THEME_KEY) === "dark");
  const [language, setLanguage] = useState("ar");
  const [timezone, setTimezone] = useState("Africa/Cairo");
  const [currency, setCurrency] = useState("EGP");

  const [notificationPrefs, setNotificationPrefs] = useState(defaultNotificationPrefs);
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessions, setSessions] = useState(activeSessions);

  const [deactivateOpen, setDeactivateOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.theme = darkMode ? "dark" : "light";
    localStorage.setItem(THEME_KEY, darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleNotificationPref = (id) => {
    setNotificationPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const handleSavePreferences = () => {
    notify("تم حفظ تفضيلات المنصة بنجاح");
  };

  const handleSaveNotifications = () => {
    notify("تم حفظ إعدادات الإشعارات بنجاح");
  };

  const handleToggleTwoFactor = (value) => {
    setTwoFactor(value);
    notify(value ? "تم تفعيل المصادقة الثنائية" : "تم إيقاف المصادقة الثنائية");
  };

  const handleLogoutSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    notify("تم تسجيل الخروج من هذا الجهاز");
  };

  const handleDeactivate = () => {
    setDeactivateOpen(false);
    notify("تم إرسال طلب تعطيل الحساب، سيتم مراجعته خلال 24 ساعة", "danger");
  };

  return (
    <div>
      <div className={styles.titleBlock}>
        <h1>الإعدادات</h1>
        <p>تخصيص تفضيلات المنصة، الإشعارات، والأمان الخاص بحسابك</p>
      </div>

      {/* Platform preferences */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>
          <FiGlobe /> تفضيلات المنصة
        </h3>

        <div className={styles.grid3}>
          <div className={styles.field}>
            <label>اللغة</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>المنطقة الزمنية</label>
            <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
              <option value="Africa/Cairo">القاهرة (GMT+2)</option>
              <option value="Asia/Riyadh">الرياض (GMT+3)</option>
              <option value="Asia/Dubai">دبي (GMT+4)</option>
              <option value="Europe/London">لندن (GMT+1)</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>العملة</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="EGP">جنيه مصري (ج.م)</option>
              <option value="SAR">ريال سعودي (ر.س)</option>
              <option value="USD">دولار أمريكي ($)</option>
            </select>
          </div>
        </div>

        <div className={styles.themeRow}>
          <div className={styles.themeText}>
            {darkMode ? <FiMoon /> : <FiSun />}
            <span className={styles.label}>الوضع الليلي</span>
            <span className={styles.description}>تفعيل المظهر الداكن لراحة العين أثناء العمل ليلاً</span>
          </div>
          <Toggle checked={darkMode} onChange={setDarkMode} />
        </div>

        <Button icon={<FiSave />} onClick={handleSavePreferences}>
          حفظ التفضيلات
        </Button>
      </div>

      {/* Notifications */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>الإشعارات</h3>
        <div className={styles.notifList}>
          {notificationPrefs.map((pref) => (
            <div key={pref.id} className={styles.notifRow}>
              <Toggle
                checked={pref.enabled}
                onChange={() => toggleNotificationPref(pref.id)}
                label={pref.label}
                description={pref.description}
              />
            </div>
          ))}
        </div>
        <Button icon={<FiSave />} onClick={handleSaveNotifications}>
          حفظ إعدادات الإشعارات
        </Button>
      </div>

      {/* Security */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>
          <FiShield /> الأمان
        </h3>

        <div className={styles.themeRow}>
          <div className={styles.themeText}>
            <FiShield />
            <span className={styles.label}>المصادقة الثنائية (2FA)</span>
            <span className={styles.description}>طبقة حماية إضافية عبر رمز تحقق يُرسل لهاتفك عند تسجيل الدخول</span>
          </div>
          <Toggle checked={twoFactor} onChange={handleToggleTwoFactor} />
        </div>

        <h4 className={styles.subTitle}>الأجهزة المتصلة حالياً</h4>
        <div className={styles.sessionsList}>
          {sessions.map((s) => (
            <div key={s.id} className={styles.sessionRow}>
              <span className={styles.sessionIcon}>
                {s.icon === "mobile" ? <FiSmartphone /> : <FiMonitor />}
              </span>
              <div className={styles.sessionInfo}>
                <span className={styles.sessionDevice}>
                  {s.device} {s.current && <span className={styles.currentTag}>هذا الجهاز</span>}
                </span>
                <span className={styles.sessionMeta}>{s.location} · {s.lastActive}</span>
              </div>
              {!s.current && (
                <button className={styles.sessionLogout} onClick={() => handleLogoutSession(s.id)}>
                  <FiLogOut /> إنهاء الجلسة
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className={`${styles.card} ${styles.dangerCard}`}>
        <h3 className={styles.sectionTitle}>
          <FiAlertTriangle /> منطقة الخطر
        </h3>
        <p className={styles.dangerText}>
          تعطيل حسابك سيؤدي إلى إخفاء دوراتك ومحتواك عن الطلاب مؤقتاً حتى تقوم بإعادة تفعيله. هذا الإجراء لا يحذف بياناتك.
        </p>
        <Button variant="danger" onClick={() => setDeactivateOpen(true)}>
          تعطيل الحساب
        </Button>
      </div>

      <Modal
        open={deactivateOpen}
        onClose={() => setDeactivateOpen(false)}
        title="تأكيد تعطيل الحساب"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeactivateOpen(false)}>إلغاء</Button>
            <Button variant="danger" onClick={handleDeactivate}>تعطيل الحساب</Button>
          </>
        }
      >
        هل أنت متأكد أنك تريد تعطيل حسابك؟ لن يتمكن الطلاب من الوصول إلى دوراتك حتى تقوم بإعادة التفعيل.
      </Modal>
    </div>
  );
}
