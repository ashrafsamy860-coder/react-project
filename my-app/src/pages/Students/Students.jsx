import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiChevronDown, FiEye, FiMail, FiMoreVertical, FiUserX, FiUserCheck, FiTrash2, FiSend, FiUserPlus } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { buildStudentStats, getStatus } from "../../data/mockData";
import StatCard from "../../components/StatCard/StatCard";
import Badge from "../../components/Badge/Badge";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import Dropdown from "../../components/Dropdown/Dropdown";
import SafeImage from "../../components/SafeImage/SafeImage";
import EnrollStudentModal from "../../components/EnrollStudentModal/EnrollStudentModal";
import styles from "./Students.module.css";

const PAGE_SIZE = 5;

export default function Students() {
  const { students, updateStudentStatus, deleteStudent, sendMessageToStudent, newlyEnrolledCount } = useApp();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [messageTarget, setMessageTarget] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [toDelete, setToDelete] = useState(null);
  const [enrollOpen, setEnrollOpen] = useState(false);

  const studentStats = useMemo(() => buildStudentStats(students, newlyEnrolledCount), [students, newlyEnrolledCount]);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "all" || s.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [students, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    sendMessageToStudent(messageTarget.name);
    setMessageTarget(null);
    setMessageText("");
  };

  const confirmDelete = () => {
    deleteStudent(toDelete.id);
    setToDelete(null);
  };

  return (
    <div>
      <div className={styles.headerRow}>
        <Button icon={<FiUserPlus />} onClick={() => setEnrollOpen(true)}>
          تسجيل طالب جديد
        </Button>
        <div className={styles.titleBlock}>
          <h1>الطلاب</h1>
          <p>إدارة الطلاب المسجلين في دوراتك</p>
        </div>
      </div>

      <div className={styles.statsRow}>
        {studentStats.map((s) => (
          <StatCard key={s.id} id={s.id} icon={s.icon} label={s.label} value={s.value} />
        ))}
      </div>

      <div className={styles.filterBar}>
        <div className={styles.selectWrap}>
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="all">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="completed">مكتمل</option>
            <option value="inactive">غير نشط</option>
          </select>
          <FiChevronDown className={styles.chevron} />
        </div>
        <div className={styles.searchWrap}>
          <input
            type="text"
            placeholder="بحث باسم الطالب أو البريد الإلكتروني..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
          <FiSearch className={styles.searchIcon} />
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>الطالب</th>
              <th>الدورة المسجلة</th>
              <th>نسبة التقدم</th>
              <th>تاريخ الانضمام</th>
              <th>الحالة</th>
              <th>التحكم</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((s, i) => (
              <motion.tr
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
              >
                <td>
                  <div className={styles.studentCell}>
                    <SafeImage src={s.avatar} alt={s.name} fallbackSeed={s.id} />
                    <div className={styles.studentTextCol}>
                      <div className={styles.studentName}>{s.name}</div>
                      <div className={styles.studentEmail}>{s.email}</div>
                    </div>
                  </div>
                </td>
                <td className={styles.courseCell} title={s.course}>{s.course}</td>
                <td>
                  <div className={styles.progressWrap}>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: `${s.progress}%` }} />
                    </div>
                    <span>{s.progress}%</span>
                  </div>
                </td>
                <td>{s.joinDate}</td>
                <td>
                  <Badge label={getStatus(s.status).label} color={getStatus(s.status).color} />
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.iconBtn} onClick={() => setSelected(s)} aria-label="عرض">
                      <FiEye />
                    </button>
                    <button className={styles.iconBtn} onClick={() => setMessageTarget(s)} aria-label="مراسلة">
                      <FiMail />
                    </button>
                    <Dropdown
                      trigger={() => (
                        <button className={styles.iconBtn} aria-label="خيارات إضافية">
                          <FiMoreVertical />
                        </button>
                      )}
                      align="end"
                    >
                      {(close) => (
                        <div className={styles.menu}>
                          <button
                            onClick={() => {
                              updateStudentStatus(s.id, s.status === "active" ? "inactive" : "active");
                              close();
                            }}
                          >
                            {s.status === "active" ? <FiUserX /> : <FiUserCheck />}
                            {s.status === "active" ? "إيقاف الطالب" : "تفعيل الطالب"}
                          </button>
                          <button
                            className={styles.menuDanger}
                            onClick={() => {
                              setToDelete(s);
                              close();
                            }}
                          >
                            <FiTrash2 /> حذف الطالب
                          </button>
                        </div>
                      )}
                    </Dropdown>
                  </div>
                </td>
              </motion.tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.empty}>
                  لا يوجد طلاب مطابقون
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />

      <Modal open={!!selected} onClose={() => setSelected(null)} title="بيانات الطالب">
        {selected && (
          <div className={styles.modalBody}>
            <SafeImage src={selected.avatar} alt={selected.name} fallbackSeed={selected.id} className={styles.modalAvatar} />
            <h3>{selected.name}</h3>
            <p className={styles.modalEmail}>{selected.email}</p>
            <div className={styles.modalRow}>
              <span>رقم الهاتف</span>
              <strong>{selected.phone}</strong>
            </div>
            <div className={styles.modalRow}>
              <span>الدورة</span>
              <strong>{selected.course}</strong>
            </div>
            <div className={styles.modalRow}>
              <span>نسبة التقدم</span>
              <strong>{selected.progress}%</strong>
            </div>
            <div className={styles.modalRow}>
              <span>تاريخ الانضمام</span>
              <strong>{selected.joinDate}</strong>
            </div>
            <div className={styles.modalRow}>
              <span>الحالة</span>
              <Badge label={getStatus(selected.status).label} color={getStatus(selected.status).color} />
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={!!messageTarget}
        onClose={() => setMessageTarget(null)}
        title={messageTarget ? `مراسلة ${messageTarget.name}` : ""}
        footer={
          <>
            <Button variant="ghost" onClick={() => setMessageTarget(null)}>إلغاء</Button>
            <Button icon={<FiSend />} onClick={handleSendMessage}>إرسال</Button>
          </>
        }
      >
        <textarea
          className={styles.messageArea}
          rows={5}
          placeholder="اكتب رسالتك هنا..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
      </Modal>

      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="تأكيد الحذف"
        footer={
          <>
            <Button variant="ghost" onClick={() => setToDelete(null)}>إلغاء</Button>
            <Button variant="danger" onClick={confirmDelete}>حذف</Button>
          </>
        }
      >
        هل أنت متأكد أنك تريد حذف الطالب {toDelete?.name}؟ لا يمكن التراجع عن هذا الإجراء.
      </Modal>

      <EnrollStudentModal open={enrollOpen} onClose={() => setEnrollOpen(false)} />
    </div>
  );
}
