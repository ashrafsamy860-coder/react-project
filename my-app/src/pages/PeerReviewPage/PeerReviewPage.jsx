import React from "react";
import { useParams } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import StarRating from "../../components/StarRating/StarRating";
import BackButton from "../../components/BackButton/BackButton";
import SafeImage from "../../components/SafeImage/SafeImage";
import { avatarPlaceholder } from "../../utils/placeholderImages";
import styles from "./PeerReviewPage.module.css";

export default function PeerReviewPage() {
  const { id, reviewId } = useParams();
  const { assignments, peerReviews } = useApp();

  const assignment = assignments.find((a) => a.id === id) || assignments[0];
  const review = peerReviews.find((r) => r.id === reviewId) || peerReviews[0];

  return (
    <div>
      <BackButton label={`العودة إلى ${assignment.title}`} to={`/assignments/${assignment.id}`} />

      <div className={styles.card}>
        <div className={styles.peopleRow}>
          <div className={styles.person}>
            <span className={styles.personLabel}>المُراجِع</span>
            <div className={styles.personInfo}>
              <span>{review.reviewer}</span>
              <SafeImage src={review.reviewerAvatar} alt={review.reviewer} fallbackSeed={review.reviewer} />
            </div>
          </div>
          <FiArrowRight className={styles.arrow} />
          <div className={styles.person}>
            <div className={styles.personInfo}>
              <SafeImage src={review.ownerAvatar || avatarPlaceholder(review.owner)} alt={review.owner} fallbackSeed={review.owner} />
              <span>{review.owner}</span>
            </div>
            <span className={styles.personLabel}>صاحب المهمة</span>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.ratingRow}>
          <div className={styles.dateBlock}>
            <span className={styles.label}>تاريخ التقييم</span>
            <span className={styles.value}>{review.reviewDate || "-"}</span>
          </div>
          <div className={styles.starsBlock}>
            <span className={styles.label}>التقييم</span>
            <StarRating value={review.rating || 0} readOnly />
          </div>
        </div>

        <div className={styles.commentBlock}>
          <span className={styles.label}>التعليق</span>
          <p>{review.comment ? `"${review.comment}"` : "لا يوجد تعليق"}</p>
        </div>
      </div>
    </div>
  );
}
