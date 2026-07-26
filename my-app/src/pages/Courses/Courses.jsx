import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPlus, FiStar, FiUsers, FiBookOpen, FiSearch, FiChevronDown } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { buildCourseStats, courseCategories, getStatus } from "../../data/mockData";
import StatCard from "../../components/StatCard/StatCard";
import Badge from "../../components/Badge/Badge";
import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import SafeImage from "../../components/SafeImage/SafeImage";
import styles from "./Courses.module.css";

const PAGE_SIZE = 6;

export default function Courses() {
  const { courses, addCourse } = useApp();
  const navigate = useNavigate();
  const courseStats = useMemo(() => buildCourseStats(courses), [courses]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);

  const [form, setForm] = useState({ title: "", category: courseCategories[0], price: "", lessons: "", level: "مبتدئ" });
  const [formErrors, setFormErrors] = useState({});

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch = !search || c.title.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "all" || c.status === status;
      const matchesCategory = category === "all" || c.category === category;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [courses, search, status, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "عنوان الدورة مطلوب";
    if (!form.price) errs.price = "سعر الدورة مطلوب";
    if (!form.lessons) errs.lessons = "عدد الدروس مطلوب";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddCourse = () => {
    if (!validate()) return;
    addCourse({
      title: form.title,
      category: form.category,
      price: Number(form.price),
      lessons: Number(form.lessons),
      level: form.level,
      duration: `${Math.round(form.lessons * 0.7)} ساعة`,
    });
    setForm({ title: "", category: courseCategories[0], price: "", lessons: "", level: "مبتدئ" });
    setAddOpen(false);
  };

  return (
    <div>
      <div className={styles.headerRow}>
        <Button icon={<FiPlus />} onClick={() => setAddOpen(true)}>
          إضافة دورة جديدة
        </Button>
        <div className={styles.titleBlock}>
          <h1>دوراتي</h1>
          <p>إدارة الدورات التدريبية الخاصة بك</p>
        </div>
      </div>

      <div className={styles.statsRow}>
        {courseStats.map((s) => (
          <StatCard key={s.id} id={s.id} icon={s.icon} label={s.label} value={s.value} />
        ))}
      </div>

      <div className={styles.filterBar}>
        <div className={styles.selectWrap}>
          <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
            <option value="all">جميع التصنيفات</option>
            {courseCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <FiChevronDown className={styles.chevron} />
        </div>
        <div className={styles.selectWrap}>
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="all">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="draft">مسودة</option>
            <option value="inactive">غير نشط</option>
          </select>
          <FiChevronDown className={styles.chevron} />
        </div>
        <div className={styles.searchWrap}>
          <input
            type="text"
            placeholder="بحث بعنوان الدورة..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
          <FiSearch className={styles.searchIcon} />
        </div>
      </div>

      <div className={styles.grid}>
        {paged.map((c, i) => (
          <motion.div
            key={c.id}
            className={styles.card}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
            whileHover={{ y: -4 }}
          >
            <div className={styles.imageWrap} onClick={() => navigate(`/courses/${c.id}`)}>
              <SafeImage src={c.image} alt={c.title} fallbackSeed={c.category} variant="cover" />
              <span className={styles.statusOverlay}>
                <Badge label={getStatus(c.status).label} color={getStatus(c.status).color} />
              </span>
              <span className={styles.categoryOverlay}>{c.category}</span>
            </div>
            <div className={styles.body}>
              <h3 className={styles.title} title={c.title} onClick={() => navigate(`/courses/${c.id}`)}>
                {c.title}
              </h3>

              <div className={styles.metaRow}>
                <span className={styles.metaItem}>
                  <FiUsers /> {c.students} طالب
                </span>
                <span className={styles.metaItem}>
                  <FiBookOpen /> {c.lessons} درس
                </span>
                <span className={styles.metaItem}>
                  <FiStar /> {c.rating || "—"}
                </span>
              </div>

              <div className={styles.progressWrap}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${c.progress}%` }} />
                </div>
                <span className={styles.progressLabel}>نسبة الإكمال {c.progress}%</span>
              </div>

              <div className={styles.footer}>
                <span className={styles.price}>{c.price.toLocaleString()} ج.م</span>
                <button className={styles.detailsBtn} onClick={() => navigate(`/courses/${c.id}`)}>
                  عرض التفاصيل
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {paged.length === 0 && <p className={styles.empty}>لا توجد دورات مطابقة لبحثك</p>}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="إضافة دورة جديدة"
        footer={
          <>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>إلغاء</Button>
            <Button onClick={handleAddCourse}>حفظ الدورة</Button>
          </>
        }
      >
        <div className={styles.formField}>
          <label>عنوان الدورة</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="أدخل عنوان الدورة"
          />
          {formErrors.title && <span className={styles.formError}>{formErrors.title}</span>}
        </div>
        <div className={styles.formField}>
          <label>التصنيف</label>
          <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
            {courseCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formField}>
            <label>السعر (ج.م)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              placeholder="0"
            />
            {formErrors.price && <span className={styles.formError}>{formErrors.price}</span>}
          </div>
          <div className={styles.formField}>
            <label>عدد الدروس</label>
            <input
              type="number"
              value={form.lessons}
              onChange={(e) => setForm((f) => ({ ...f, lessons: e.target.value }))}
              placeholder="0"
            />
            {formErrors.lessons && <span className={styles.formError}>{formErrors.lessons}</span>}
          </div>
        </div>
        <div className={styles.formField}>
          <label>المستوى</label>
          <select value={form.level} onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}>
            <option value="مبتدئ">مبتدئ</option>
            <option value="متوسط">متوسط</option>
            <option value="متقدم">متقدم</option>
          </select>
        </div>
      </Modal>
    </div>
  );
}
