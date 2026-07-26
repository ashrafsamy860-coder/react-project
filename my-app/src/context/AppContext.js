import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import {
  currentUser as mockUser,
  assignments as mockAssignments,
  submissions as mockSubmissions,
  peerReviews as mockPeerReviews,
  coursesData as mockCourses,
  studentsData as mockStudents,
  certificatesData as mockCertificates,
  initialTransactions,
  initialProfitState,
  initialNotifications,
  categoryImages,
} from "../data/mockData";
import { avatarPlaceholder } from "../utils/placeholderImages";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user] = useState(mockUser);

  const [assignments, setAssignments] = useState(mockAssignments);
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [peerReviews] = useState(mockPeerReviews);

  const [courses, setCourses] = useState(mockCourses);
  const [students, setStudents] = useState(mockStudents);
  const [certificates, setCertificates] = useState(mockCertificates);
  const [newlyEnrolledCount, setNewlyEnrolledCount] = useState(0);

  const [transactions, setTransactions] = useState(initialTransactions);
  const [profit, setProfit] = useState(initialProfitState);

  const [notifications, setNotifications] = useState(initialNotifications);

  const [toast, setToast] = useState(null);

  const notify = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => setToast(null), 2600);
  }, []);

  // ---------------- Assignments ----------------
  const addAssignment = useCallback(
    (newAssignment) => {
      setAssignments((prev) => [
        { id: `a-${Date.now()}`, status: "review", submissionsCount: 0, submissionsTotal: 30, ...newAssignment },
        ...prev,
      ]);
      notify("تم إضافة التكليف بنجاح");
    },
    [notify]
  );

  const updateAssignment = useCallback(
    (id, updates) => {
      setAssignments((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
      notify("تم تحديث التكليف بنجاح");
    },
    [notify]
  );

  const deleteAssignment = useCallback(
    (id) => {
      setAssignments((prev) => prev.filter((a) => a.id !== id));
      notify("تم حذف التكليف", "danger");
    },
    [notify]
  );

  const updateSubmissionGrade = useCallback(
    (id, grade, comment) => {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, grade, comment, status: "corrected" } : s))
      );
      notify("تم حفظ الدرجة والتعليق بنجاح");
    },
    [notify]
  );

  // ---------------- Courses ----------------
  const addCourse = useCallback(
    (course) => {
      const id = `c-${Date.now()}`;
      setCourses((prev) => [
        {
          students: 0,
          lessons: Number(course.lessons) || 10,
          rating: 0,
          progress: 0,
          level: course.level || "مبتدئ",
          duration: course.duration || "—",
          status: "draft",
          image: categoryImages[course.category] || categoryImages["برمجة"],
          description: course.description || "",
          ...course,
          id,
        },
        ...prev,
      ]);
      notify("تم إضافة الدورة بنجاح");
      return id;
    },
    [notify]
  );

  const updateCourseStatus = useCallback(
    (id, status) => {
      setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
      notify("تم تحديث حالة الدورة");
    },
    [notify]
  );

  const deleteCourse = useCallback(
    (id) => {
      setCourses((prev) => prev.filter((c) => c.id !== id));
      notify("تم حذف الدورة", "danger");
    },
    [notify]
  );

  // ---------------- Students ----------------
  // Enrolling a student links them to a real course: it creates the student
  // record (shows up instantly in the Students page) AND bumps that course's
  // student count (shows up instantly in the Courses page / course stats).
  const enrollStudent = useCallback(
    ({ name, email, phone, courseId }) => {
      const course = courses.find((c) => c.id === courseId);
      if (!name || !email || !course) {
        notify("يرجى تعبئة جميع بيانات الطالب واختيار الدورة", "danger");
        return false;
      }

      const newStudent = {
        id: `st-${Date.now()}`,
        name,
        email,
        phone: phone || "-",
        avatar: avatarPlaceholder(name),
        course: course.title,
        courseId: course.id,
        progress: 0,
        joinDate: new Date().toLocaleDateString("en-GB").replaceAll("/", "-"),
        status: "active",
      };

      setStudents((prev) => [newStudent, ...prev]);
      setCourses((prev) =>
        prev.map((c) => (c.id === course.id ? { ...c, students: (c.students || 0) + 1 } : c))
      );
      setNewlyEnrolledCount((prev) => prev + 1);
      notify(`تم تسجيل ${name} في دورة "${course.title}" بنجاح`);
      return true;
    },
    [courses, notify]
  );

  const updateStudentStatus = useCallback(
    (id, status) => {
      setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
      notify(status === "inactive" ? "تم إيقاف الطالب" : "تم تحديث حالة الطالب");
    },
    [notify]
  );

  const deleteStudent = useCallback(
    (id) => {
      setStudents((prev) => prev.filter((s) => s.id !== id));
      notify("تم حذف الطالب", "danger");
    },
    [notify]
  );

  const sendMessageToStudent = useCallback(
    (studentName) => {
      notify(`تم إرسال الرسالة إلى ${studentName}`);
    },
    [notify]
  );

  // ---------------- Certificates ----------------
  const issueCertificate = useCallback(
    (id) => {
      setCertificates((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, status: "issued", issueDate: new Date().toLocaleDateString("en-GB").replaceAll("/", "-") } : c
        )
      );
      notify("تم إصدار الشهادة بنجاح");
    },
    [notify]
  );

  const downloadCertificate = useCallback(
    (studentName) => {
      notify(`جاري تحميل شهادة ${studentName}...`);
    },
    [notify]
  );

  // ---------------- Profits ----------------
  const withdrawProfit = useCallback(
    (amount) => {
      if (!amount || amount <= 0) {
        notify("يرجى إدخال مبلغ صحيح", "danger");
        return false;
      }
      if (amount > profit.pending) {
        notify("المبلغ أكبر من الرصيد المتاح للسحب", "danger");
        return false;
      }
      setProfit((prev) => ({ ...prev, pending: prev.pending - amount, withdrawn: prev.withdrawn + amount }));
      setTransactions((prev) => [
        {
          id: `tx-${Date.now()}`,
          desc: "عملية سحب أرباح",
          student: "-",
          date: new Date().toLocaleDateString("en-GB").replaceAll("/", "-"),
          amount: -amount,
          status: "completed",
        },
        ...prev,
      ]);
      notify("تم تقديم طلب السحب بنجاح");
      return true;
    },
    [profit.pending, notify]
  );

  // ---------------- Notifications ----------------
  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadNotificationsCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  // ---------------- Global search ----------------
  const searchAll = useCallback(
    (query) => {
      const q = query.trim().toLowerCase();
      if (!q) return [];
      const results = [];

      courses.forEach((c) => {
        if (c.title.toLowerCase().includes(q)) {
          results.push({ type: "course", label: c.title, sub: "دورة", to: `/courses/${c.id}` });
        }
      });
      students.forEach((s) => {
        if (s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)) {
          results.push({ type: "student", label: s.name, sub: "طالب", to: `/students` });
        }
      });
      assignments.forEach((a) => {
        if (a.title.toLowerCase().includes(q)) {
          results.push({ type: "assignment", label: a.title, sub: "تكليف", to: `/assignments/${a.id}` });
        }
      });

      return results.slice(0, 8);
    },
    [courses, students, assignments]
  );

  const value = {
    user,
    assignments,
    submissions,
    peerReviews,
    courses,
    students,
    certificates,
    transactions,
    profit,
    notifications,
    newlyEnrolledCount,
    toast,
    notify,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    updateSubmissionGrade,
    addCourse,
    updateCourseStatus,
    deleteCourse,
    enrollStudent,
    updateStudentStatus,
    deleteStudent,
    sendMessageToStudent,
    issueCertificate,
    downloadCertificate,
    withdrawProfit,
    markAllNotificationsRead,
    unreadNotificationsCount,
    searchAll,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
}
