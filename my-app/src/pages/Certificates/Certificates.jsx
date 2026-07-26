import React, { useMemo, useState } from "react";
import { FiSearch, FiChevronDown, FiDownload, FiEye, FiAward } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { certificateStats, getStatus } from "../../data/mockData";
import StatCard from "../../components/StatCard/StatCard";
import Badge from "../../components/Badge/Badge";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import SafeImage from "../../components/SafeImage/SafeImage";
import styles from "./Certificates.module.css";

const PAGE_SIZE = 5;

export default function Certificates() {
  const { certificates, downloadCertificate, issueCertificate } = useApp();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [preview, setPreview] = useState(null);

  const filtered = useMemo(() => {
    return certificates.filter((c) => {
      const matchesSearch =
        !search ||
        c.student.toLowerCase().includes(search.toLowerCase()) ||
        c.course.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "all" || c.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [certificates, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className={styles.titleBlock}>
        <h1>الشهادات</h1>
        <p>إدارة شهادات إتمام الدورات للطلاب</p>
      </div>

      <div className={styles.statsRow}>
        {certificateStats.map((s) => (
          <StatCard key={s.id} id={s.id} icon={s.icon} label={s.label} value={s.value} />
        ))}
      </div>

      <div className={styles.filterBar}>
        <div className={styles.selectWrap}>
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="all">جميع الحالات</option>
            <option value="issued">صادرة</option>
            <option value="pending">قيد الإصدار</option>
          </select>
          <FiChevronDown className={styles.chevron} />
        </div>
        <div className={styles.searchWrap}>
          <input
            type="text"
            placeholder="بحث باسم الطالب أو الدورة..."
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
              <th>الدورة</th>
              <th>تاريخ الإصدار</th>
              <th>الحالة</th>
              <th>التحكم</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((c) => (
              <tr key={c.id}>
                <td>
                  <div className={styles.studentCell}>
                    <SafeImage src={c.avatar} alt={c.student} fallbackSeed={c.student} />
                    {c.student}
                  </div>
                </td>
                <td className={styles.courseCell} title={c.course}>{c.course}</td>
                <td>{c.issueDate}</td>
                <td>
                  <Badge label={getStatus(c.status).label} color={getStatus(c.status).color} />
                </td>
                <td>
                  <div className={styles.actions}>
                    {c.status === "issued" ? (
                      <button className={styles.iconBtn} onClick={() => downloadCertificate(c.student)} aria-label="تحميل">
                        <FiDownload />
                      </button>
                    ) : (
                      <button className={styles.issueBtn} onClick={() => issueCertificate(c.id)}>
                        <FiAward /> إصدار
                      </button>
                    )}
                    <button className={styles.iconBtn} onClick={() => setPreview(c)} aria-label="معاينة">
                      <FiEye />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.empty}>
                  لا توجد شهادات مطابقة
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />

      <Modal
        open={!!preview}
        onClose={() => setPreview(null)}
        title="معاينة الشهادة"
        footer={
          preview?.status === "issued" && (
            <Button icon={<FiDownload />} onClick={() => downloadCertificate(preview.student)}>
              تحميل الشهادة
            </Button>
          )
        }
      >
        {preview && (
          <div className={styles.certificatePreview}>
            <FiAward className={styles.certIcon} />
            <h3>شهادة إتمام دورة</h3>
            <p className={styles.certCourse}>{preview.course}</p>
            <p className={styles.certStudent}>تُمنح هذه الشهادة إلى</p>
            <p className={styles.certName}>{preview.student}</p>
            <p className={styles.certDate}>
              {preview.status === "issued" ? `تاريخ الإصدار: ${preview.issueDate}` : "الشهادة قيد الإصدار"}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
