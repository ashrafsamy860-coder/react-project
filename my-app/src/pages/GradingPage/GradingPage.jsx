import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiAlertCircle, FiExternalLink, FiDownload, FiFileText, FiSave } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import Button from "../../components/Button/Button";
import BackButton from "../../components/BackButton/BackButton";
import SafeImage from "../../components/SafeImage/SafeImage";
import { realAvatarUrl } from "../../utils/placeholderImages";
import styles from "./GradingPage.module.css";

export default function GradingPage() {
  const { id, subId } = useParams();
  const navigate = useNavigate();
  const { assignments, submissions, updateSubmissionGrade } = useApp();

  const assignment = assignments.find((a) => a.id === id) || assignments[0];
  const submission = submissions.find((s) => s.id === subId) || submissions[0];

  const [grade, setGrade] = useState(submission?.grade ?? "");
  const [comment, setComment] = useState(submission?.comment ?? "");

  const handleSave = () => {
    updateSubmissionGrade(submission.id, Number(grade), comment);
    navigate(`/assignments/${assignment.id}`);
  };

  return (
    <div>
      <BackButton label={`العودة إلى ${assignment.title}`} to={`/assignments/${assignment.id}`} />

      <div className={styles.card}>
        <div className={styles.topRow}>
          <button className={styles.reportBtn}>
            <FiAlertCircle />
            ابلاغ
          </button>
          <div className={styles.studentInfo}>
            <span>{submission.studentName}</span>
            <SafeImage src={realAvatarUrl(submission.studentName)} alt={submission.studentName} fallbackSeed={submission.studentName} />
          </div>
        </div>

        <div className={styles.fileRow}>
          <div className={styles.fileIcons}>
            <FiExternalLink />
            <FiDownload />
          </div>
          <div className={styles.fileName}>
            <span>{assignment.title} (PDF)</span>
            <FiFileText />
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.gradeRow}>
          <div className={styles.gradeInputWrap}>
            <input
              type="number"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className={styles.gradeInput}
              max={assignment.totalGrade}
              min={0}
            />
          </div>
          <div className={styles.gradeLabelBlock}>
            <span className={styles.gradeLabel}>الدرجة</span>
            <span className={styles.gradeFull}>الدرجة الكاملة {assignment.totalGrade}</span>
          </div>
        </div>

        <div className={styles.field}>
          <label>التعليق</label>
          <textarea
            rows={6}
            placeholder="اكتب تعليقا لحل الطالب"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </div>

      <Button icon={<FiSave />} onClick={handleSave}>
        حفظ التغييرات
      </Button>
    </div>
  );
}
