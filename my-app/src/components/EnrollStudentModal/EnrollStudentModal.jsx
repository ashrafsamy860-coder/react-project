import React, { useState, useEffect } from "react";
import { FiUserPlus } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import styles from "./EnrollStudentModal.module.css";

// Shared enrollment form used from both the Students page (course selectable)
// and a Course detail page (course locked to the current course).
export default function EnrollStudentModal({ open, onClose, lockedCourseId = null }) {
  const { courses, enrollStudent } = useApp();
  const [form, setForm] = useState({ name: "", email: "", phone: "", courseId: lockedCourseId || "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm({ name: "", email: "", phone: "", courseId: lockedCourseId || courses[0]?.id || "" });
      setErrors({});
    }
  }, [open, lockedCourseId, courses]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "اسم الطالب مطلوب";
    if (!form.email.trim()) next.email = "البريد الإلكتروني مطلوب";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "صيغة البريد الإلكتروني غير صحيحة";
    if (!form.courseId) next.courseId = "يرجى اختيار الدورة";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const ok = enrollStudent(form);
    if (ok) onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="تسجيل طالب جديد"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>إلغاء</Button>
          <Button icon={<FiUserPlus />} onClick={handleSubmit}>تسجيل الطالب</Button>
        </>
      }
    >
      <div className={styles.field}>
        <label>اسم الطالب</label>
        <input
          type="text"
          placeholder="أدخل اسم الطالب الكامل"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={errors.name ? styles.errorInput : ""}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.field}>
        <label>البريد الإلكتروني</label>
        <input
          type="email"
          placeholder="example@email.com"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={errors.email ? styles.errorInput : ""}
        />
        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
      </div>

      <div className={styles.field}>
        <label>رقم الهاتف (اختياري)</label>
        <input
          type="text"
          placeholder="01xxxxxxxxx"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label>الدورة</label>
        <select
          value={form.courseId}
          onChange={(e) => handleChange("courseId", e.target.value)}
          disabled={Boolean(lockedCourseId)}
          className={errors.courseId ? styles.errorInput : ""}
        >
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
        {errors.courseId && <span className={styles.errorText}>{errors.courseId}</span>}
      </div>
    </Modal>
  );
}
