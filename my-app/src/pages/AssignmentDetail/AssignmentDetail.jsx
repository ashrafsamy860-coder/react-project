import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit2, FiExternalLink, FiFileText, FiEye, FiMessageSquare, FiUsers } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { getStatus } from "../../data/mockData";
import Badge from "../../components/Badge/Badge";
import Button from "../../components/Button/Button";
import BackButton from "../../components/BackButton/BackButton";
import SafeImage from "../../components/SafeImage/SafeImage";
import styles from "./AssignmentDetail.module.css";

const PAGE_SIZE = 6;

export default function AssignmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assignments, submissions, peerReviews } = useApp();

  const assignment = assignments.find((a) => a.id === id) || assignments[0];
  const [tab, setTab] = useState("peerReview"); // peerReview | submissions
  const [page, setPage] = useState(1);

  const list = tab === "peerReview" ? peerReviews : submissions;
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const paged = useMemo(
    () => list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [list, page]
  );

  if (!assignment) return <p>التكليف غير موجود</p>;

  return (
    <div>
      <BackButton label="العودة إلى التكليفات" to="/assignments" />

      <div className={styles.headerRow}>
        <Button icon={<FiEdit2 />} onClick={() => navigate(`/assignments/${assignment.id}/edit`)}>
          تعديل المهمة
        </Button>
        <div className={styles.titleBlock}>
          <h1>التكليف</h1>
          <p>إدارة مهمة او تمرين الطلاب</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.badges}>
            {assignment.peerReviewEnabled && <Badge label="مراجعة الزملاء مفعل" color="success" />}
            <Badge label={getStatus(assignment.status).label} color={getStatus(assignment.status).color} />
          </div>
          <h2 className={styles.assignmentTitle}>{assignment.title}</h2>
        </div>

        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>تاريخ الاستلام</span>
            <span className={styles.metaValue}>{assignment.dueDate}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>الدورة التابعة</span>
            <span className={styles.metaValue}>{assignment.course}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>تاريخ الانشاء</span>
            <span className={styles.metaValue}>{assignment.createdAt}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>الدرس</span>
            <span className={styles.metaValue}>{assignment.lesson}</span>
          </div>
        </div>

        <div className={styles.descBlock}>
          <span className={styles.metaLabel}>وصف المهمة</span>
          <p>{assignment.description}</p>
        </div>

        <div className={styles.footerBadges}>
          <span className={styles.pill}>اجمالي الدرجة {assignment.totalGrade}</span>
          <span className={styles.pill}>عدد مرات إعادة التسليم {assignment.resubmissions}</span>
        </div>
      </div>

      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>بيانات التكليف</h3>
        <div className={styles.dataGrid}>
          <div>
            <span className={styles.metaLabel}>عدد التكليفات المستلمة</span>
            <p className={styles.dataValue}>
              {assignment.submissionsCount} من {assignment.submissionsTotal}
            </p>
          </div>
          <div>
            <span className={styles.metaLabel}>ملفات التكليف</span>
            <div className={styles.fileRow}>
              <FiExternalLink />
              <FiFileText />
              <span>{assignment.taskFile}</span>
            </div>
            <div className={styles.fileRow}>
              <FiExternalLink />
              <FiFileText />
              <span>{assignment.solutionFile}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tabsRow}>
        <button
          className={`${styles.tabBtn} ${tab === "peerReview" ? styles.tabActive : ""}`}
          onClick={() => {
            setTab("peerReview");
            setPage(1);
          }}
        >
          مراجعة الزملاء
        </button>
        <button
          className={`${styles.tabBtn} ${tab === "submissions" ? styles.tabActive : ""}`}
          onClick={() => {
            setTab("submissions");
            setPage(1);
          }}
        >
          التكليفات المستلمة
        </button>
      </div>

      <div className={styles.tableWrap}>
        {tab === "peerReview" ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>المُراجِع</th>
                <th>صاحب المهمة</th>
                <th>التقييم</th>
                <th>الحالة</th>
                <th>التحكم</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((pr) => (
                <tr key={pr.id}>
                  <td className={styles.personCell}>
                    <SafeImage src={pr.reviewerAvatar} alt={pr.reviewer} fallbackSeed={pr.reviewer} />
                    {pr.reviewer}
                  </td>
                  <td className={styles.personCell}>
                    {pr.ownerAvatar && <SafeImage src={pr.ownerAvatar} alt={pr.owner} fallbackSeed={pr.owner} />}
                    {pr.owner}
                  </td>
                  <td>{pr.rating ? `★ ${pr.rating}` : "-"}</td>
                  <td>
                    <Badge label={getStatus(pr.status).label} color={getStatus(pr.status).color} />
                  </td>
                  <td>
                    <div className={styles.actions}>
                      {pr.status !== "reviewed" && (
                        <button className={styles.iconBtn} aria-label="إعادة تعيين">
                          <FiUsers />
                        </button>
                      )}
                      <button
                        className={styles.iconBtn}
                        onClick={() => navigate(`/assignments/${assignment.id}/peer-review/${pr.id}`)}
                      >
                        <FiEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>الطالب</th>
                <th>تاريخ التسليم</th>
                <th>الدرجة</th>
                <th>الحالة</th>
                <th>التحكم</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((sub) => (
                <tr key={sub.id}>
                  <td>{sub.studentName}</td>
                  <td>{sub.submittedAt}</td>
                  <td>{sub.grade ?? "-"}</td>
                  <td>
                    <Badge label={getStatus(sub.status).label} color={getStatus(sub.status).color} />
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.iconBtn}>
                        <FiMessageSquare />
                      </button>
                      <button
                        className={styles.iconBtn}
                        onClick={() => navigate(`/assignments/${assignment.id}/grade/${sub.id}`)}
                      >
                        <FiEdit2 />
                      </button>
                      <button className={styles.iconBtn}>
                        <FiEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className={styles.pagerRow}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`${styles.pageBtn} ${page === i + 1 ? styles.pageActive : ""}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <span className={styles.pagerInfo}>
          عرض البيانات من {(page - 1) * PAGE_SIZE + 1} إلى {Math.min(page * PAGE_SIZE, list.length)} من أصل{" "}
          {list.length} ملف مستلم
        </span>
      </div>
    </div>
  );
}
