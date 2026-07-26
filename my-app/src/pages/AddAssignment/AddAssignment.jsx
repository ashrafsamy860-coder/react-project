import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { courses, getCurriculum, getModuleLessons } from "../../data/mockData";
import Button from "../../components/Button/Button";
import FileUpload from "../../components/FileUpload/FileUpload";
import BackButton from "../../components/BackButton/BackButton";
import styles from "./AddAssignment.module.css";

export default function AddAssignment() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { assignments, addAssignment } = useApp();

  const existing = isEdit ? assignments.find((a) => a.id === id) : null;

  const [form, setForm] = useState({
    title: existing?.title || "",
    description: existing?.description || "",
    course: existing?.course || "",
    lesson: existing?.lesson || "",
    totalGrade: existing?.totalGrade || "",
    resubmissions: existing?.resubmissions || "",
    dueDate: existing?.dueDate || "",
    peerReviewEnabled: existing?.peerReviewEnabled ?? true,
  });
  const [errors, setErrors] = useState({});

  // Lessons depend on the selected course: pull that course's real curriculum
  // instead of showing a fixed, unrelated list of 3 generic lesson names.
  const selectedCourse = courses.find((c) => c.title === form.course);
  const courseLessons = useMemo(() => {
    if (!selectedCourse) return [];
    const curriculum = getCurriculum(selectedCourse.id);
    return curriculum.flatMap((m) => getModuleLessons(selectedCourse.id, m));
  }, [selectedCourse]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      // Changing the course invalidates a previously picked lesson.
      ...(field === "course" ? { lesson: "" } : {}),
    }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "عنوان التكليف مطلوب";
    if (!form.description.trim()) next.description = "وصف التكليف مطلوب";
    if (!form.course) next.course = "الدورة التابعة مطلوبة";
    if (!form.lesson) next.lesson = "الدرس مطلوب";
    if (!form.totalGrade) next.totalGrade = "اجمالي الدرجة مطلوب";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    addAssignment(form);
    navigate("/assignments");
  };

  return (
    <div>
      <BackButton label="العودة إلى التكليفات" to="/assignments" />
      <div className={styles.headerBlock}>
        <h1>{isEdit ? "تعديل التكليف" : "إضافة تكليف جديد"}</h1>
        <p>أدخل بيانات التمرين الجديدة</p>
      </div>

      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>المعلومات الأساسية</h3>
        <p className={styles.sectionHint}>أدخل المعلومات الأساسية للمهمة او التمرين</p>

        <div className={styles.field}>
          <label>عنوان التكليف</label>
          <input
            type="text"
            placeholder="أدخل عنوان المهمة او التمرين"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={errors.title ? styles.errorInput : ""}
          />
          {errors.title && <span className={styles.errorText}>{errors.title}</span>}
        </div>

        <div className={styles.field}>
          <label>وصف التكليف</label>
          <textarea
            rows={4}
            placeholder="أدخل وصف تفصيلي للمهمة او التمرين"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className={errors.description ? styles.errorInput : ""}
          />
          {errors.description && <span className={styles.errorText}>{errors.description}</span>}
        </div>

        <div className={styles.grid3}>
          <div className={styles.field}>
            <label>الدورة التابعة</label>
            <select
              value={form.course}
              onChange={(e) => handleChange("course", e.target.value)}
              className={errors.course ? styles.errorInput : ""}
            >
              <option value="">اختر الدورة التابعة</option>
              {courses.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
            {errors.course && <span className={styles.errorText}>{errors.course}</span>}
          </div>

          <div className={styles.field}>
            <label>الدرس</label>
            <select
              value={form.lesson}
              onChange={(e) => handleChange("lesson", e.target.value)}
              className={errors.lesson ? styles.errorInput : ""}
              disabled={!form.course}
            >
              <option value="">{form.course ? "اختر الدرس" : "اختر الدورة أولاً"}</option>
              {courseLessons.map((l) => (
                <option key={l.id} value={l.title}>
                  {l.title}
                </option>
              ))}
            </select>
            {errors.lesson && <span className={styles.errorText}>{errors.lesson}</span>}
          </div>

          <div className={styles.field}>
            <label>اجمالي درجة المهمة</label>
            <input
              type="number"
              placeholder="ادخل الدرجة بالارقام"
              value={form.totalGrade}
              onChange={(e) => handleChange("totalGrade", e.target.value)}
              className={errors.totalGrade ? styles.errorInput : ""}
            />
            {errors.totalGrade && <span className={styles.errorText}>{errors.totalGrade}</span>}
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>تاريخ الاستلام</label>
            <input
              type="text"
              placeholder="اختر تاريخ الاستلام"
              value={form.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label>إعادة التسليم</label>
            <input
              type="number"
              placeholder="ادخل عدد مرات إعادة التسليم"
              value={form.resubmissions}
              onChange={(e) => handleChange("resubmissions", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.toggleRow}>
          <button
            type="button"
            className={`${styles.toggle} ${form.peerReviewEnabled ? styles.toggleOn : ""}`}
            onClick={() => handleChange("peerReviewEnabled", !form.peerReviewEnabled)}
          >
            <span className={styles.toggleDot} />
          </button>
          <span>مراجعة الزملاء</span>
        </div>
      </div>

      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>المرفقات والملفات</h3>
        <div className={styles.uploadsGrid}>
          <FileUpload label="رفع التكليف" />
          <FileUpload label="رفع الحل" />
        </div>
      </div>

      <div className={styles.actionsRow}>
        <Button icon={<FiSave />} onClick={handleSubmit}>
          حفظ التغييرات
        </Button>
        <Button variant="ghost" onClick={() => navigate("/assignments")}>
          الغاء
        </Button>
      </div>
    </div>
  );
}
