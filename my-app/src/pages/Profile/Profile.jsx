import React, { useState } from "react";
import { FiCamera, FiSave } from "react-icons/fi";
import { instructorProfile } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import Button from "../../components/Button/Button";
import SafeImage from "../../components/SafeImage/SafeImage";
import styles from "./Profile.module.css";

export default function Profile() {
  const { notify } = useApp();
  const [form, setForm] = useState({ ...instructorProfile });
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => notify("تم حفظ بيانات الملف الشخصي بنجاح");

  const handlePasswordSave = () => {
    if (!passwords.current || !passwords.next) {
      notify("يرجى تعبئة جميع الحقول", "danger");
      return;
    }
    if (passwords.next !== passwords.confirm) {
      notify("كلمتا المرور غير متطابقتين", "danger");
      return;
    }
    setPasswords({ current: "", next: "", confirm: "" });
    notify("تم تغيير كلمة المرور بنجاح");
  };

  return (
    <div>
      <div className={styles.titleBlock}>
        <h1>الملف الشخصي</h1>
        <p>إدارة بيانات حسابك الشخصي</p>
      </div>

      <div className={styles.card}>
        <div className={styles.avatarRow}>
          <div className={styles.avatarWrap}>
            <SafeImage src={form.avatar} alt={form.name} fallbackSeed={form.name} />
            <button className={styles.cameraBtn} aria-label="تغيير الصورة">
              <FiCamera />
            </button>
          </div>
          <div>
            <h3>{form.name}</h3>
            <p className={styles.specialty}>{form.specialty}</p>
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>الاسم الكامل</label>
            <input type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>البريد الإلكتروني</label>
            <input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>رقم الهاتف</label>
            <input type="text" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>التخصص</label>
            <input type="text" value={form.specialty} onChange={(e) => handleChange("specialty", e.target.value)} />
          </div>
        </div>

        <div className={styles.field}>
          <label>نبذة عني</label>
          <textarea rows={4} value={form.bio} onChange={(e) => handleChange("bio", e.target.value)} />
        </div>

        <Button icon={<FiSave />} onClick={handleSave}>
          حفظ التغييرات
        </Button>
      </div>

      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>تغيير كلمة المرور</h3>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>كلمة المرور الحالية</label>
            <input
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
            />
          </div>
          <div />
          <div className={styles.field}>
            <label>كلمة المرور الجديدة</label>
            <input
              type="password"
              value={passwords.next}
              onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))}
            />
          </div>
          <div className={styles.field}>
            <label>تأكيد كلمة المرور</label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
            />
          </div>
        </div>
        <Button variant="outline" icon={<FiSave />} onClick={handlePasswordSave}>
          تحديث كلمة المرور
        </Button>
      </div>
    </div>
  );
}
