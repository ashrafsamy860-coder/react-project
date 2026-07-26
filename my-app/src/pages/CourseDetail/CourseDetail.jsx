import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiUsers,
  FiBookOpen,
  FiStar,
  FiClock,
  FiBarChart2,
  FiEdit2,
  FiChevronDown,
  FiUserPlus,
  FiPlayCircle,
  FiCheckCircle,
  FiLock,
  FiTrash2,
} from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { getStatus, getCurriculum, getModuleLessons } from "../../data/mockData";
import Badge from "../../components/Badge/Badge";
import Button from "../../components/Button/Button";
import BackButton from "../../components/BackButton/BackButton";
import SafeImage from "../../components/SafeImage/SafeImage";
import EnrollStudentModal from "../../components/EnrollStudentModal/EnrollStudentModal";
import Modal from "../../components/Modal/Modal";
import styles from "./CourseDetail.module.css";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, updateCourseStatus, deleteCourse } = useApp();

  const course = courses.find((c) => c.id === id) || courses[0];
  const curriculum = useMemo(() => getCurriculum(course.id), [course.id]);

  // Every module's playable lessons (title + duration + video), computed once
  // per course so switching lessons doesn't reshuffle content.
  const modulesWithLessons = useMemo(
    () => curriculum.map((m) => ({ ...m, items: getModuleLessons(course.id, m) })),
    [curriculum, course.id]
  );

  const allLessonsFlat = useMemo(
    () => modulesWithLessons.flatMap((m) => m.items),
    [modulesWithLessons]
  );

  const [openModule, setOpenModule] = useState(modulesWithLessons[0]?.id);
  const [activeLesson, setActiveLesson] = useState(allLessonsFlat[0]);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  // Lessons the viewer has marked watched in this session, layered on top of
  // the seed "completed" flag from mock data so progress can actually move.
  const [watchedIds, setWatchedIds] = useState(() =>
    new Set(allLessonsFlat.filter((l) => l.completed).map((l) => l.id))
  );

  if (!course) return <p>الدورة غير موجودة</p>;

  const isWatched = (lesson) => watchedIds.has(lesson.id);
  const completedCount = allLessonsFlat.filter((l) => isWatched(l)).length;
  const totalCount = allLessonsFlat.length;

  const handleSelectLesson = (lesson) => {
    setActiveLesson(lesson);
  };

  const markActiveLessonWatched = () => {
    setActiveLesson((current) => {
      if (current) {
        setWatchedIds((prev) => new Set(prev).add(current.id));
      }
      return current;
    });
  };

  const goToNextLesson = () => {
    const idx = allLessonsFlat.findIndex((l) => l.id === activeLesson?.id);
    const next = allLessonsFlat[idx + 1];
    if (next) setActiveLesson(next);
  };

  const handleDelete = () => {
    deleteCourse(course.id);
    setDeleteOpen(false);
    navigate("/courses");
  };

  return (
    <div>
      <BackButton label="العودة إلى دوراتي" to="/courses" />

      <div className={styles.heroCard}>
        <SafeImage src={course.image} alt={course.title} fallbackSeed={course.category} variant="cover" className={styles.heroImage} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroCategory}>{course.category}</span>
          <h1>{course.title}</h1>
          <div className={styles.heroMeta}>
            <span><FiUsers /> {course.students} طالب</span>
            <span><FiBookOpen /> {course.lessons} درس</span>
            <span><FiClock /> {course.duration}</span>
            <span><FiBarChart2 /> {course.level}</span>
            <span><FiStar /> {course.rating || "—"}</span>
          </div>
        </div>
        <div className={styles.heroBadge}>
          <Badge label={getStatus(course.status).label} color={getStatus(course.status).color} />
        </div>
      </div>

      <div className={styles.actionsRow}>
        <div className={styles.actionsLeft}>
          <Button
            icon={<FiEdit2 />}
            variant={course.status === "active" ? "outline" : "primary"}
            onClick={() => updateCourseStatus(course.id, course.status === "active" ? "inactive" : "active")}
          >
            {course.status === "active" ? "إيقاف الدورة" : "تفعيل الدورة"}
          </Button>
          <Button icon={<FiUserPlus />} variant="ghost" onClick={() => setEnrollOpen(true)}>
            تسجيل طالب في هذه الدورة
          </Button>
          <Button icon={<FiTrash2 />} variant="danger" onClick={() => setDeleteOpen(true)}>
            حذف الدورة
          </Button>
        </div>
        <span className={styles.price}>{course.price.toLocaleString()} ج.م</span>
      </div>

      <div className={styles.splitRow}>
        <div className={styles.mainCol}>
          {activeLesson && (
            <div className={styles.card}>
              <div className={styles.playerWrap}>
                <video
                  key={activeLesson.id}
                  className={styles.player}
                  src={activeLesson.videoUrl}
                  controls
                  controlsList="nodownload"
                  onEnded={() => {
                    markActiveLessonWatched();
                  }}
                >
                  متصفحك لا يدعم عرض الفيديو.
                </video>
              </div>
              <div className={styles.playerInfo}>
                <div>
                  <h3 className={styles.playerTitle}>
                    {activeLesson.order}. {activeLesson.title}
                  </h3>
                  <span className={styles.playerMeta}>{activeLesson.duration}</span>
                </div>
                <div className={styles.playerActions}>
                  <Button
                    variant={isWatched(activeLesson) ? "outline" : "primary"}
                    icon={<FiCheckCircle />}
                    onClick={markActiveLessonWatched}
                  >
                    {isWatched(activeLesson) ? "تم مشاهدته" : "تحديد كمكتمل"}
                  </Button>
                  <Button variant="ghost" onClick={goToNextLesson}>
                    الدرس التالي
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>وصف الدورة</h3>
            <p className={styles.description}>{course.description}</p>
          </div>

          <div className={styles.card}>
            <div className={styles.curriculumHeader}>
              <h3 className={styles.sectionTitle}>محتوى الدورة</h3>
              <span className={styles.curriculumProgress}>
                {completedCount} من {totalCount} درس مكتمل
              </span>
            </div>

            <div className={styles.curriculum}>
              {modulesWithLessons.map((m) => (
                <div key={m.id} className={styles.moduleItem}>
                  <button
                    className={styles.moduleHeader}
                    onClick={() => setOpenModule(openModule === m.id ? null : m.id)}
                  >
                    <FiChevronDown className={`${styles.moduleChevron} ${openModule === m.id ? styles.moduleChevronOpen : ""}`} />
                    <span className={styles.moduleTitle}>{m.title}</span>
                    <span className={styles.moduleMeta}>{m.lessonsCount} دروس · {m.duration}</span>
                  </button>
                  {openModule === m.id && (
                    <div className={styles.moduleBody}>
                      {m.items.map((lesson) => {
                        const isActive = activeLesson?.id === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            className={`${styles.lessonRow} ${isActive ? styles.lessonRowActive : ""}`}
                            onClick={() => handleSelectLesson(lesson)}
                          >
                            <span className={styles.lessonLeft}>
                              {isWatched(lesson) ? (
                                <FiCheckCircle className={styles.lessonDoneIcon} />
                              ) : isActive ? (
                                <FiPlayCircle className={styles.lessonPlayIcon} />
                              ) : (
                                <FiLock className={styles.lessonLockIcon} />
                              )}
                              <span className={styles.lessonTitle}>
                                {lesson.order}. {lesson.title}
                              </span>
                            </span>
                            <span className={styles.lessonDuration}>{lesson.duration}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>إحصائيات سريعة</h3>
            <div className={styles.statRow}>
              <span>عدد الطلاب</span>
              <strong>{course.students}</strong>
            </div>
            <div className={styles.statRow}>
              <span>عدد الدروس</span>
              <strong>{course.lessons}</strong>
            </div>
            <div className={styles.statRow}>
              <span>مدة الدورة</span>
              <strong>{course.duration}</strong>
            </div>
            <div className={styles.statRow}>
              <span>المستوى</span>
              <strong>{course.level}</strong>
            </div>
            <div className={styles.statRow}>
              <span>نسبة الإكمال</span>
              <strong>{course.progress}%</strong>
            </div>
          </div>
        </div>
      </div>

      <EnrollStudentModal open={enrollOpen} onClose={() => setEnrollOpen(false)} lockedCourseId={course.id} />

      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="تأكيد حذف الدورة"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteOpen(false)}>إلغاء</Button>
            <Button variant="danger" onClick={handleDelete}>حذف نهائياً</Button>
          </>
        }
      >
        هل أنت متأكد أنك تريد حذف دورة «{course.title}»؟ لا يمكن التراجع عن هذا الإجراء.
      </Modal>
    </div>
  );
}
