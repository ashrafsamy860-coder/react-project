// Centralized mock data - simulates API responses until a real backend is connected.
import {
  realAvatarUrl,
  realCourseCoverUrl,
} from "../utils/placeholderImages";

export const currentUser = {
  id: "u-1",
  name: "م. محمد محمود",
  role: "مدرب",
  avatar: realAvatarUrl("محمد محمود", "male"),
};

export const statCards = [
  { id: "late", label: "المهام و التمارين متأخرة", value: 40, icon: "clipboard-alert" },
  { id: "graded", label: "المهام و التمارين تم التصحيح", value: 300, icon: "clipboard-check" },
  { id: "review", label: "المهام و التمارين قيد المراجعة", value: 150, icon: "clipboard-edit" },
  { id: "total", label: "إجمالي المهام و التمارين", value: 490, icon: "clipboard" },
];

export const statusMap = {
  review: { label: "قيد المراجعة", color: "warning" },
  completed: { label: "مكتمل", color: "success" },
  late: { label: "متأخرة", color: "danger" },
  pending: { label: "معلقة", color: "danger" },
  reviewed: { label: "تمت مراجعتها", color: "success" },
  corrected: { label: "تمت تصحيحها", color: "success" },
  reviewing: { label: "جاري مراجعتها", color: "warning" },
  active: { label: "نشط", color: "success" },
  draft: { label: "مسودة", color: "warning" },
  inactive: { label: "غير نشط", color: "danger" },
  suspended: { label: "موقوف", color: "danger" },
  issued: { label: "صادرة", color: "success" },
  refunded: { label: "مسترجعة", color: "neutral" },
};

// Safe getter — never throws even if a status key is missing/mistyped.
export function getStatus(key) {
  return statusMap[key] || { label: key || "-", color: "neutral" };
}

// Each assignment has its own title, course, lesson and description — tied to
// a real course from coursesData — instead of being cloned from one shared
// object. This is what previously made every row in "التكليفات" look identical.
export const assignments = [
  {
    id: "a-1",
    title: "تمرين 1: استخدام المتغيرات",
    course: "تحليل البيانات باستخدام Python",
    createdAt: "30-12-2025",
    lesson: "المتغيرات وكيفية تخزين البيانات",
    description:
      "في هذا التمرين، ستتعلم كيفية استخدام المتغيرات في لغة Python لتخزين البيانات والتعامل معها. قم بحل الأسئلة التالية مع مراعاة كتابة كود منظم وواضح.",
    totalGrade: 20,
    resubmissions: 3,
    peerReviewEnabled: true,
    taskFile: "تمرين استخدام المتغيرات (PDF)",
    solutionFile: "حل تمرين استخدام المتغيرات (PDF)",
    dueDate: "24-01-2026",
    status: "review",
    submissionsCount: 15,
    submissionsTotal: 30,
  },
  {
    id: "a-2",
    title: "تمرين 2: هياكل التحكم والحلقات",
    course: "تحليل البيانات باستخدام Python",
    createdAt: "02-01-2026",
    lesson: "الحلقة التكرارية for",
    description:
      "طبّق جمل الشرط والحلقات التكرارية (for / while) لحل مجموعة من المسائل المنطقية، مع تجربة أوامر break و continue في مواضع مناسبة.",
    totalGrade: 20,
    resubmissions: 2,
    peerReviewEnabled: true,
    taskFile: "تمرين هياكل التحكم (PDF)",
    solutionFile: "حل تمرين هياكل التحكم (PDF)",
    dueDate: "12-01-2026",
    status: "completed",
    submissionsCount: 30,
    submissionsTotal: 30,
  },
  {
    id: "a-3",
    title: "مشروع: تحليل بيانات مبيعات باستخدام Pandas",
    course: "تحليل البيانات باستخدام Python",
    createdAt: "05-01-2026",
    lesson: "مشروع تطبيقي: تحليل بيانات مبيعات حقيقية",
    description:
      "قم بتحميل ملف مبيعات بصيغة CSV، ونظّف البيانات، ثم استخرج أهم 3 مؤشرات (أعلى منتج مبيعاً، متوسط الفاتورة، الاتجاه الشهري) باستخدام مكتبة Pandas.",
    totalGrade: 30,
    resubmissions: 1,
    peerReviewEnabled: false,
    taskFile: "بيانات المبيعات + التعليمات (PDF)",
    solutionFile: "الحل النموذجي (PDF)",
    dueDate: "02-02-2026",
    status: "late",
    submissionsCount: 15,
    submissionsTotal: 30,
  },
  {
    id: "a-4",
    title: "تمرين: بناء صفحة تسجيل دخول بـ HTML و CSS",
    course: "تطوير الويب المتكامل (Full Stack)",
    createdAt: "08-01-2026",
    lesson: "تصميم الصفحات باستخدام HTML5 و CSS3",
    description:
      "صمّم صفحة تسجيل دخول متجاوبة (Responsive) تحتوي على حقلي بريد إلكتروني وكلمة مرور وزر دخول، مع الالتزام بمبادئ التصميم المتجاوب.",
    totalGrade: 15,
    resubmissions: 2,
    peerReviewEnabled: true,
    taskFile: "متطلبات صفحة تسجيل الدخول (PDF)",
    solutionFile: "الحل النموذجي (ZIP)",
    dueDate: "18-01-2026",
    status: "completed",
    submissionsCount: 28,
    submissionsTotal: 30,
  },
  {
    id: "a-5",
    title: "تمرين: ربط الواجهة الأمامية بقاعدة البيانات",
    course: "تطوير الويب المتكامل (Full Stack)",
    createdAt: "15-01-2026",
    lesson: "الاتصال بقاعدة البيانات وإدارة الـ API",
    description:
      "أنشئ واجهة برمجية بسيطة (REST API) تتيح عرض وإضافة عناصر من قاعدة بيانات، واربطها بصفحة عرض في الواجهة الأمامية.",
    totalGrade: 25,
    resubmissions: 2,
    peerReviewEnabled: true,
    taskFile: "متطلبات المشروع (PDF)",
    solutionFile: "الكود النموذجي (ZIP)",
    dueDate: "29-01-2026",
    status: "review",
    submissionsCount: 9,
    submissionsTotal: 28,
  },
  {
    id: "a-6",
    title: "تمرين: تصنيف الصور باستخدام نموذج بسيط",
    course: "الذكاء الاصطناعي للمبتدئين",
    createdAt: "10-01-2026",
    lesson: "مقدمة في التعلم الآلي وتصنيف الصور",
    description:
      "درّب نموذج تصنيف صور بسيط باستخدام مجموعة بيانات جاهزة، ثم اشرح في تقرير قصير دقة النموذج وأهم التحديات التي واجهتك.",
    totalGrade: 20,
    resubmissions: 1,
    peerReviewEnabled: false,
    taskFile: "بيانات ومتطلبات التمرين (PDF)",
    solutionFile: "الحل النموذجي (Notebook)",
    dueDate: "20-01-2026",
    status: "completed",
    submissionsCount: 22,
    submissionsTotal: 24,
  },
  {
    id: "a-7",
    title: "تمرين: تصميم شاشة تسجيل دخول (Wireframe + UI)",
    course: "تصميم واجهات المستخدم UI/UX",
    createdAt: "11-01-2026",
    lesson: "من الـ Wireframe إلى تصميم الواجهة النهائي",
    description:
      "صمّم Wireframe لشاشة تسجيل الدخول ثم حوّله إلى تصميم UI كامل الألوان والخطوط باستخدام Figma، مع مراعاة مبادئ سهولة الاستخدام.",
    totalGrade: 20,
    resubmissions: 2,
    peerReviewEnabled: true,
    taskFile: "بريف التصميم (PDF)",
    solutionFile: "ملف Figma النموذجي",
    dueDate: "25-01-2026",
    status: "completed",
    submissionsCount: 34,
    submissionsTotal: 34,
  },
  {
    id: "a-8",
    title: "تمرين: إعداد خطة تسويق رقمي متكاملة",
    course: "التسويق الرقمي الاحترافي",
    createdAt: "06-01-2026",
    lesson: "بناء الخطة التسويقية ووضع الأهداف",
    description:
      "اختر منتجاً افتراضياً وضع له خطة تسويق رقمي متكاملة تشمل الجمهور المستهدف، القنوات المستخدمة، والميزانية التقديرية لمدة شهر.",
    totalGrade: 25,
    resubmissions: 2,
    peerReviewEnabled: true,
    taskFile: "نموذج الخطة التسويقية (PDF)",
    solutionFile: "خطة نموذجية (PDF)",
    dueDate: "16-01-2026",
    status: "completed",
    submissionsCount: 41,
    submissionsTotal: 45,
  },
  {
    id: "a-9",
    title: "تمرين: إعداد ميزانية وجدول زمني لمشروع",
    course: "إدارة المشاريع الاحترافية PMP",
    createdAt: "09-01-2026",
    lesson: "إدارة الوقت والتكلفة في المشروع",
    description:
      "بناءً على سيناريو مشروع معطى، أعدّ جدولاً زمنياً (Gantt) وميزانية تقديرية، مع تحديد أهم المخاطر المحتملة وخطة التعامل معها.",
    totalGrade: 20,
    resubmissions: 1,
    peerReviewEnabled: false,
    taskFile: "سيناريو المشروع (PDF)",
    solutionFile: "الحل النموذجي (Excel)",
    dueDate: "19-01-2026",
    status: "review",
    submissionsCount: 6,
    submissionsTotal: 18,
  },
];

// Submissions received from students for a given assignment
export const submissions = [
  { id: "sub-1", studentId: "st-1", studentName: "خالد سمير", submittedAt: "30-12-2025", grade: null, status: "reviewing" },
  { id: "sub-2", studentId: "st-2", studentName: "احمد محمود", submittedAt: "30-12-2025", grade: null, status: "pending" },
  { id: "sub-3", studentId: "st-3", studentName: "سارة علي", submittedAt: "30-12-2025", grade: 20, status: "corrected" },
  { id: "sub-4", studentId: "st-4", studentName: "ياسمين خالد", submittedAt: "30-12-2025", grade: 15, status: "corrected" },
  { id: "sub-5", studentId: "st-6", studentName: "نور محمد", submittedAt: "30-12-2025", grade: 10, status: "corrected" },
  { id: "sub-6", studentId: "st-7", studentName: "كريم عادل", submittedAt: "30-12-2025", grade: 18, status: "corrected" },
];

// Peer review pairs for a given assignment — each reviewer/owner is a
// distinct student (no one reviews their own submission).
export const peerReviews = [
  { id: "pr-1", reviewer: "خالد سمير", reviewerAvatar: realAvatarUrl("خالد سمير"), owner: "احمد محمود", ownerAvatar: realAvatarUrl("احمد محمود"), rating: 4, status: "reviewed", comment: "عمل جيد، لكن يحتاج إلى تحسين في تنظيف البيانات", reviewDate: "30-12-2025" },
  { id: "pr-2", reviewer: "سارة علي", reviewerAvatar: realAvatarUrl("سارة علي"), owner: "-", ownerAvatar: null, rating: null, status: "pending", comment: "", reviewDate: "" },
  { id: "pr-3", reviewer: "ياسمين خالد", reviewerAvatar: realAvatarUrl("ياسمين خالد"), owner: "-", ownerAvatar: null, rating: null, status: "reviewing", comment: "", reviewDate: "" },
  { id: "pr-4", reviewer: "نور محمد", reviewerAvatar: realAvatarUrl("نور محمد"), owner: "كريم عادل", ownerAvatar: realAvatarUrl("كريم عادل"), rating: 5, status: "reviewed", comment: "عمل ممتاز ومرتب", reviewDate: "30-12-2025" },
  { id: "pr-5", reviewer: "كريم عادل", reviewerAvatar: realAvatarUrl("كريم عادل"), owner: "خالد سمير", ownerAvatar: realAvatarUrl("خالد سمير"), rating: 2, status: "reviewed", comment: "يحتاج مزيد من التوضيح", reviewDate: "30-12-2025" },
  { id: "pr-6", reviewer: "احمد محمود", reviewerAvatar: realAvatarUrl("احمد محمود"), owner: "سارة علي", ownerAvatar: realAvatarUrl("سارة علي"), rating: 3, status: "reviewed", comment: "عمل جيد بشكل عام", reviewDate: "30-12-2025" },
];

export const lessons = [
  { id: "l-1", title: "الدرس الاول" },
  { id: "l-2", title: "الدرس الثاني" },
  { id: "l-3", title: "الدرس الثالث" },
];

// ---------------------------------------------------------------------------
// Courses — real, category-matched cover images (Unsplash) + rich detail data
// ---------------------------------------------------------------------------

export const courseCategoryList = [
  "علوم البيانات",
  "برمجة",
  "ذكاء اصطناعي",
  "تصميم",
  "تسويق رقمي",
  "إدارة أعمال",
  "تطوير تطبيقات",
  "أمن سيبراني",
  "حوسبة سحابية",
  "تصوير فوتوغرافي",
  "لغات",
  "تمويل واستثمار",
];

export const categoryImages = Object.fromEntries(
  courseCategoryList.map((category) => [category, realCourseCoverUrl(category)])
);

export const courseStats = [
  { id: "active", label: "الدورات النشطة", value: 10 },
  { id: "students", label: "إجمالي الطلاب", value: 2140 },
  { id: "rating", label: "متوسط التقييم", value: "4.7" },
  { id: "revenue", label: "إجمالي الإيرادات", value: "312,600 ج.م" },
];

// Derives live stat-card values from the actual courses array, so adding a
// course or enrolling a student updates these numbers immediately.
export function buildCourseStats(courses) {
  const active = courses.filter((c) => c.status === "active").length;
  const totalStudents = courses.reduce((sum, c) => sum + (c.students || 0), 0);
  const rated = courses.filter((c) => c.rating);
  const avgRating = rated.length
    ? (rated.reduce((sum, c) => sum + c.rating, 0) / rated.length).toFixed(1)
    : "—";
  const revenue = courses.reduce((sum, c) => sum + (c.price || 0) * (c.students || 0), 0);

  return [
    { id: "active", label: "الدورات النشطة", value: active },
    { id: "students", label: "إجمالي الطلاب", value: totalStudents.toLocaleString() },
    { id: "rating", label: "متوسط التقييم", value: avgRating },
    { id: "revenue", label: "إجمالي الإيرادات", value: `${revenue.toLocaleString()} ج.م` },
  ];
}

export const coursesData = [
  { id: "c-1", title: "تحليل البيانات باستخدام Python", category: "علوم البيانات", students: 214, lessons: 24, rating: 4.8, price: 899, status: "active", progress: 82, level: "متوسط", duration: "18 ساعة" },
  { id: "c-2", title: "تطوير الويب المتكامل (Full Stack)", category: "برمجة", students: 178, lessons: 32, rating: 4.6, price: 1199, status: "active", progress: 65, level: "متقدم", duration: "26 ساعة" },
  { id: "c-3", title: "الذكاء الاصطناعي للمبتدئين", category: "ذكاء اصطناعي", students: 96, lessons: 18, rating: 4.9, price: 1499, status: "draft", progress: 40, level: "مبتدئ", duration: "14 ساعة" },
  { id: "c-4", title: "تصميم واجهات المستخدم UI/UX", category: "تصميم", students: 154, lessons: 20, rating: 4.5, price: 799, status: "active", progress: 100, level: "متوسط", duration: "16 ساعة" },
  { id: "c-5", title: "التسويق الرقمي الاحترافي", category: "تسويق رقمي", students: 302, lessons: 22, rating: 4.4, price: 649, status: "active", progress: 100, level: "مبتدئ", duration: "15 ساعة" },
  { id: "c-6", title: "إدارة المشاريع الاحترافية PMP", category: "إدارة أعمال", students: 121, lessons: 28, rating: 4.7, price: 1099, status: "active", progress: 55, level: "متقدم", duration: "22 ساعة" },
  { id: "c-7", title: "تطوير تطبيقات Flutter", category: "تطوير تطبيقات", students: 88, lessons: 26, rating: 4.6, price: 999, status: "active", progress: 30, level: "متوسط", duration: "20 ساعة" },
  { id: "c-8", title: "أساسيات الأمن السيبراني", category: "أمن سيبراني", students: 143, lessons: 19, rating: 4.8, price: 899, status: "active", progress: 90, level: "متوسط", duration: "17 ساعة" },
  { id: "c-9", title: "الحوسبة السحابية مع AWS", category: "حوسبة سحابية", students: 76, lessons: 21, rating: 4.5, price: 1299, status: "draft", progress: 20, level: "متقدم", duration: "19 ساعة" },
  { id: "c-10", title: "أساسيات التصوير الفوتوغرافي", category: "تصوير فوتوغرافي", students: 210, lessons: 15, rating: 4.3, price: 499, status: "active", progress: 100, level: "مبتدئ", duration: "10 ساعات" },
  { id: "c-11", title: "تعلم اللغة الإنجليزية للمحترفين", category: "لغات", students: 389, lessons: 30, rating: 4.6, price: 599, status: "active", progress: 100, level: "مبتدئ", duration: "24 ساعة" },
  { id: "c-12", title: "أساسيات التمويل والاستثمار", category: "تمويل واستثمار", students: 169, lessons: 17, rating: 4.7, price: 899, status: "inactive", progress: 100, level: "متوسط", duration: "13 ساعة" },
].map((c) => ({
  ...c,
  image: categoryImages[c.category],
  description: `دورة ${c.title} تقدم لك شرحاً عملياً وتطبيقياً من الصفر حتى الاحتراف، مع مشاريع حقيقية ومتابعة مستمرة من المدرب لضمان أفضل استفادة من المحتوى التعليمي.`,
}));

export const courseCategories = Object.keys(categoryImages);

// Simple {id, title} list used by dropdowns (e.g. Add Assignment form)
export const courses = coursesData.map((c) => ({ id: c.id, title: c.title }));

// Curriculum & reviews keyed by course id — falls back to a generic set.
const genericCurriculum = [
  { id: "m-1", title: "الوحدة الأولى: مقدمة عامة", lessonsCount: 4, duration: "1h 20m" },
  { id: "m-2", title: "الوحدة الثانية: المفاهيم الأساسية", lessonsCount: 6, duration: "2h 10m" },
  { id: "m-3", title: "الوحدة الثالثة: التطبيق العملي", lessonsCount: 7, duration: "2h 45m" },
  { id: "m-4", title: "الوحدة الرابعة: مشروع تطبيقي شامل", lessonsCount: 5, duration: "2h 00m" },
];

export const courseCurriculumMap = {
  "c-1": [
    { id: "m-1", title: "الوحدة الأولى: مقدمة في Python", lessonsCount: 5, duration: "1h 40m" },
    { id: "m-2", title: "الوحدة الثانية: أنواع البيانات والمتغيرات", lessonsCount: 6, duration: "2h 10m" },
    { id: "m-3", title: "الوحدة الثالثة: هياكل التحكم والحلقات", lessonsCount: 7, duration: "2h 45m" },
    { id: "m-4", title: "الوحدة الرابعة: تحليل البيانات باستخدام Pandas", lessonsCount: 8, duration: "3h 20m" },
    { id: "m-5", title: "الوحدة الخامسة: التصور البياني للبيانات", lessonsCount: 6, duration: "2h 05m" },
  ],
};

export function getCurriculum(courseId) {
  return courseCurriculumMap[courseId] || genericCurriculum;
}

// ---------------------------------------------------------------------------
// Lesson videos — turns the generic "lessonsCount" into real, titled lessons
// with a playable video, so a module can be expanded into an actual lesson
// list (title + duration + video) just like a real e-learning platform.
// ---------------------------------------------------------------------------

// A rotating pool of short local placeholder videos (bundled in
// public/videos/) used as stand-ins until real lesson recordings are
// uploaded. These are served from the app itself — not a third-party CDN —
// so playback works even if the network/browser blocks external hosts.
// Kept intentionally larger than any single module's lesson count so
// consecutive lessons don't repeat the same clip.
const sampleVideoPool = [
  `${process.env.PUBLIC_URL}/videos/lesson-1.mp4`,
  `${process.env.PUBLIC_URL}/videos/lesson-2.mp4`,
  `${process.env.PUBLIC_URL}/videos/lesson-3.mp4`,
  `${process.env.PUBLIC_URL}/videos/lesson-4.mp4`,
  `${process.env.PUBLIC_URL}/videos/lesson-5.mp4`,
  `${process.env.PUBLIC_URL}/videos/lesson-6.mp4`,
  `${process.env.PUBLIC_URL}/videos/lesson-7.mp4`,
  `${process.env.PUBLIC_URL}/videos/lesson-8.mp4`,
  `${process.env.PUBLIC_URL}/videos/lesson-9.mp4`,
  `${process.env.PUBLIC_URL}/videos/lesson-10.mp4`,
  `${process.env.PUBLIC_URL}/videos/lesson-11.mp4`,
  `${process.env.PUBLIC_URL}/videos/lesson-12.mp4`,
];

// Simple deterministic string hash (djb2) so the video picked for a lesson
// depends on the *whole* course id + module id + lesson index, not just a
// string length — the previous version used module.id.length, and since
// every module id ("m-1", "m-2", "m-3"...) is 3 characters long, lesson #1
// of every module in every course resolved to the exact same clip. This
// hash spreads lessons across the full pool instead.
function hashKey(key) {
  let hash = 5381;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 33) ^ key.charCodeAt(i);
  }
  return Math.abs(hash);
}

// Explicit, hand-written lesson titles for the flagship course so the demo
// feels like a real curriculum rather than "الدرس 1، الدرس 2...".
const courseLessonTitlesMap = {
  "c-1": {
    "m-1": [
      "مقدمة عن لغة Python ولماذا نستخدمها في تحليل البيانات",
      "تثبيت بايثون وإعداد بيئة العمل (VS Code / Jupyter)",
      "كتابة أول برنامج وتشغيله",
      "التعليقات وقواعد كتابة الكود النظيف",
      "مقدمة عن المكتبات الأساسية (NumPy, Pandas, Matplotlib)",
    ],
    "m-2": [
      "المتغيرات وكيفية تخزين البيانات",
      "الأنواع الأساسية للبيانات: أرقام ونصوص",
      "القوائم Lists والتعامل معها",
      "القواميس Dictionaries والمجموعات Sets",
      "التحويل بين الأنواع Type Casting",
      "تمرين تطبيقي شامل على المتغيرات",
    ],
    "m-3": [
      "جمل الشرط if / elif / else",
      "الحلقة التكرارية for",
      "الحلقة التكرارية while",
      "أوامر break و continue",
      "الدوال البرمجية Functions",
      "تمرير المعاملات والقيم الافتراضية",
      "مشروع مصغّر: حاسبة تفاعلية",
    ],
    "m-4": [
      "مقدمة إلى مكتبة Pandas",
      "قراءة البيانات من ملفات CSV و Excel",
      "استكشاف البيانات باستخدام DataFrame",
      "تنظيف البيانات والتعامل مع القيم المفقودة",
      "الفلترة والتصفية وفرز البيانات",
      "التجميع والدمج Group By & Merge",
      "إنشاء أعمدة محسوبة جديدة",
      "مشروع تطبيقي: تحليل بيانات مبيعات حقيقية",
    ],
    "m-5": [
      "مقدمة عن التصور البياني ولماذا هو مهم",
      "رسم البيانات باستخدام Matplotlib",
      "الرسوم البيانية المتقدمة مع Seaborn",
      "لوحات المعلومات Dashboards التفاعلية",
      "أفضل الممارسات في عرض البيانات",
      "المشروع النهائي: تقرير تحليلي متكامل",
    ],
  },
};

// Deterministic fallback title generator so every course/module — even ones
// without hand-written titles — still shows a meaningful lesson name instead
// of "الدرس 1".
const fallbackLessonTemplates = [
  "مقدمة الوحدة وأهدافها",
  "الشرح النظري للمفهوم الأساسي",
  "مثال تطبيقي مباشر",
  "التمارين والتطبيق العملي",
  "الأخطاء الشائعة وكيفية تجنبها",
  "أدوات ونصائح احترافية",
  "حالة دراسية Case Study",
  "مراجعة شاملة للوحدة",
];

function buildLessonTitle(courseId, moduleId, moduleTitle, index) {
  const explicit = courseLessonTitlesMap[courseId]?.[moduleId]?.[index];
  if (explicit) return explicit;
  const template = fallbackLessonTemplates[index % fallbackLessonTemplates.length];
  return `${moduleTitle.split(":")[0]} — ${template}`;
}

// Builds a full, playable lesson list (title + duration + video) for a given
// course module. This is what powers the "real platform" video player.
export function getModuleLessons(courseId, module) {
  return Array.from({ length: module.lessonsCount }).map((_, i) => {
    const durationMinutes = 8 + ((i * 3 + module.lessonsCount) % 17);
    const videoIndex = hashKey(`${courseId}-${module.id}-lesson-${i}`) % sampleVideoPool.length;
    return {
      id: `${module.id}-lesson-${i + 1}`,
      order: i + 1,
      title: buildLessonTitle(courseId, module.id, module.title, i),
      duration: `${durationMinutes} دقيقة`,
      videoUrl: sampleVideoPool[videoIndex],
      completed: i < Math.floor(module.lessonsCount * 0.4),
    };
  });
}

const genericReviews = [
  { id: "rv-g1", student: "سلمى وجدي", avatar: realAvatarUrl("سلمى وجدي"), rating: 5, comment: "دورة ممتازة ومنظمة جداً، استفدت كتير", date: "10-01-2026" },
  { id: "rv-g2", student: "سارة علي", avatar: realAvatarUrl("سارة علي"), rating: 4, comment: "محتوى قوي لكن محتاج أمثلة تطبيقية أكتر", date: "02-01-2026" },
  { id: "rv-g3", student: "احمد محمود", avatar: realAvatarUrl("احمد محمود"), rating: 5, comment: "أفضل دورة تعاملت معها في هذا المجال", date: "22-12-2025" },
];

export function getCourseReviews() {
  return genericReviews;
}

// ---------------------------------------------------------------------------
// Students
// ---------------------------------------------------------------------------

export const studentStats = [
  { id: "total", label: "إجمالي الطلاب", value: 2140 },
  { id: "active", label: "طلاب نشطون", value: 1780 },
  { id: "new", label: "طلاب جدد هذا الشهر", value: 148 },
  { id: "completed", label: "أكملوا دورات", value: 926 },
];

// Derives live stat-card values from the actual students array, so newly
// enrolled students are reflected instantly in the header stats.
export function buildStudentStats(students, newlyEnrolledCount = 0) {
  const total = students.length;
  const active = students.filter((s) => s.status === "active").length;
  const completed = students.filter((s) => s.status === "completed").length;

  return [
    { id: "total", label: "إجمالي الطلاب", value: total.toLocaleString() },
    { id: "active", label: "طلاب نشطون", value: active.toLocaleString() },
    { id: "new", label: "طلاب جدد (هذه الجلسة)", value: newlyEnrolledCount },
    { id: "completed", label: "أكملوا دورات", value: completed.toLocaleString() },
  ];
}

export const studentsData = [
  { id: "st-1", name: "خالد سمير", avatar: realAvatarUrl("خالد سمير"), email: "khaled.samir@example.com", phone: "01011122233", course: "تحليل البيانات باستخدام Python", progress: 78, joinDate: "12-11-2025", status: "active" },
  { id: "st-2", name: "احمد محمود", avatar: realAvatarUrl("احمد محمود"), email: "ahmed.mahmoud@example.com", phone: "01022233344", course: "تطوير الويب المتكامل (Full Stack)", progress: 45, joinDate: "02-12-2025", status: "active" },
  { id: "st-3", name: "سارة علي", avatar: realAvatarUrl("سارة علي"), email: "sara.ali@example.com", phone: "01033344455", course: "الذكاء الاصطناعي للمبتدئين", progress: 100, joinDate: "20-09-2025", status: "completed" },
  { id: "st-4", name: "ياسمين خالد", avatar: realAvatarUrl("ياسمين خالد"), email: "yasmin.khaled@example.com", phone: "01044455566", course: "تصميم واجهات المستخدم UI/UX", progress: 12, joinDate: "18-01-2026", status: "active" },
  { id: "st-5", name: "عمر حسن", avatar: realAvatarUrl("عمر حسن"), email: "omar.hassan@example.com", phone: "01055566677", course: "تحليل البيانات باستخدام Python", progress: 5, joinDate: "22-01-2026", status: "inactive" },
  { id: "st-6", name: "نور محمد", avatar: realAvatarUrl("نور محمد"), email: "nour.mohamed@example.com", phone: "01066677788", course: "تطوير الويب المتكامل (Full Stack)", progress: 90, joinDate: "05-10-2025", status: "active" },
  { id: "st-7", name: "كريم عادل", avatar: realAvatarUrl("كريم عادل"), email: "karim.adel@example.com", phone: "01077788899", course: "التسويق الرقمي الاحترافي", progress: 60, joinDate: "14-12-2025", status: "active" },
  { id: "st-8", name: "منى إبراهيم", avatar: realAvatarUrl("منى إبراهيم"), email: "mona.ibrahim@example.com", phone: "01088899900", course: "أساسيات الأمن السيبراني", progress: 33, joinDate: "01-01-2026", status: "active" },
  { id: "st-9", name: "رنا فوزي", avatar: realAvatarUrl("رنا فوزي"), email: "rana.fawzy@example.com", phone: "01099900011", course: "تعلم اللغة الإنجليزية للمحترفين", progress: 70, joinDate: "15-02-2026", status: "active" },
  { id: "st-10", name: "محمود سامي", avatar: realAvatarUrl("محمود سامي"), email: "mahmoud.samy@example.com", phone: "01011223344", course: "الحوسبة السحابية مع AWS", progress: 25, joinDate: "20-02-2026", status: "active" },
  { id: "st-11", name: "شهد أحمد", avatar: realAvatarUrl("شهد أحمد"), email: "shahd.ahmed@example.com", phone: "01022334455", course: "أساسيات التصوير الفوتوغرافي", progress: 100, joinDate: "01-11-2025", status: "completed" },
  { id: "st-12", name: "عبدالرحمن طه", avatar: realAvatarUrl("عبدالرحمن طه"), email: "abdelrahman.taha@example.com", phone: "01033445566", course: "إدارة المشاريع الاحترافية PMP", progress: 48, joinDate: "10-01-2026", status: "active" },
  { id: "st-13", name: "ندى جمال", avatar: realAvatarUrl("ندى جمال"), email: "nada.gamal@example.com", phone: "01044556677", course: "أساسيات التمويل والاستثمار", progress: 15, joinDate: "25-02-2026", status: "inactive" },
  { id: "st-14", name: "دعاء ماهر", avatar: realAvatarUrl("دعاء ماهر"), email: "doaa.maher@example.com", phone: "01055667788", course: "تطوير تطبيقات Flutter", progress: 60, joinDate: "05-12-2025", status: "active" },
];

// ---------------------------------------------------------------------------
// Profits — numeric state so the "withdraw" action can actually mutate it
// ---------------------------------------------------------------------------

export const initialProfitState = {
  total: 312600,
  month: 42650,
  pending: 15200,
  withdrawn: 297400,
};

export function buildProfitStats(state) {
  return [
    { id: "total", label: "إجمالي الأرباح", value: `${state.total.toLocaleString()} ج.م` },
    { id: "month", label: "أرباح هذا الشهر", value: `${state.month.toLocaleString()} ج.م` },
    { id: "pending", label: "أرباح متاحة للسحب", value: `${state.pending.toLocaleString()} ج.م` },
    { id: "withdrawn", label: "تم سحبها", value: `${state.withdrawn.toLocaleString()} ج.م` },
  ];
}

export const monthlyEarnings = [
  { month: "أغسطس", amount: 28500 },
  { month: "سبتمبر", amount: 31800 },
  { month: "أكتوبر", amount: 26800 },
  { month: "نوفمبر", amount: 37200 },
  { month: "ديسمبر", amount: 34300 },
  { month: "يناير", amount: 42650 },
  { month: "فبراير", amount: 45900 },
];

export const initialTransactions = [
  { id: "tx-1", desc: "اشتراك دورة تحليل البيانات باستخدام Python", student: "خالد سمير", date: "12-01-2026", amount: 899, status: "completed" },
  { id: "tx-2", desc: "اشتراك دورة تطوير الويب المتكامل", student: "احمد محمود", date: "10-01-2026", amount: 1199, status: "completed" },
  { id: "tx-3", desc: "اشتراك دورة الذكاء الاصطناعي للمبتدئين", student: "سارة علي", date: "28-12-2025", amount: 1499, status: "pending" },
  { id: "tx-4", desc: "اشتراك دورة UI/UX", student: "ياسمين خالد", date: "18-01-2026", amount: 799, status: "completed" },
  { id: "tx-5", desc: "استرجاع دورة تطوير الويب المتكامل", student: "عمر حسن", date: "22-01-2026", amount: -1199, status: "refunded" },
  { id: "tx-6", desc: "اشتراك دورة التسويق الرقمي الاحترافي", student: "كريم عادل", date: "14-12-2025", amount: 649, status: "completed" },
  { id: "tx-7", desc: "اشتراك دورة أساسيات الأمن السيبراني", student: "منى إبراهيم", date: "01-01-2026", amount: 899, status: "completed" },
  { id: "tx-8", desc: "اشتراك دورة تعلم اللغة الإنجليزية للمحترفين", student: "رنا فوزي", date: "15-02-2026", amount: 599, status: "completed" },
  { id: "tx-9", desc: "اشتراك دورة الحوسبة السحابية مع AWS", student: "محمود سامي", date: "20-02-2026", amount: 1299, status: "pending" },
];

// ---------------------------------------------------------------------------
// Certificates
// ---------------------------------------------------------------------------

export const certificateStats = [
  { id: "issued", label: "شهادات صادرة", value: 926 },
  { id: "pending", label: "قيد الإصدار", value: 34 },
  { id: "courses", label: "دورات بها شهادات", value: 9 },
  { id: "month", label: "صدرت هذا الشهر", value: 58 },
];

export const certificatesData = [
  { id: "cert-1", student: "سارة علي", avatar: realAvatarUrl("سارة علي"), course: "الذكاء الاصطناعي للمبتدئين", issueDate: "20-01-2026", status: "issued" },
  { id: "cert-2", student: "نور محمد", avatar: realAvatarUrl("نور محمد"), course: "تطوير الويب المتكامل (Full Stack)", issueDate: "15-01-2026", status: "issued" },
  { id: "cert-3", student: "خالد سمير", avatar: realAvatarUrl("خالد سمير"), course: "تحليل البيانات باستخدام Python", issueDate: "-", status: "pending" },
  { id: "cert-4", student: "ياسمين خالد", avatar: realAvatarUrl("ياسمين خالد"), course: "تصميم واجهات المستخدم UI/UX", issueDate: "-", status: "pending" },
  { id: "cert-5", student: "احمد محمود", avatar: realAvatarUrl("احمد محمود"), course: "تطوير الويب المتكامل (Full Stack)", issueDate: "02-01-2026", status: "issued" },
  { id: "cert-6", student: "كريم عادل", avatar: realAvatarUrl("كريم عادل"), course: "التسويق الرقمي الاحترافي", issueDate: "05-01-2026", status: "issued" },
];

export const instructorProfile = {
  name: "محمد محمود",
  email: "instructor.mohamed@egc.com",
  phone: "01012345678",
  bio: "مدرب متخصص في تحليل البيانات والذكاء الاصطناعي بخبرة أكثر من 8 سنوات في التدريب والتطوير.",
  specialty: "علوم البيانات و الذكاء الاصطناعي",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

export const initialNotifications = [
  { id: "n-1", text: "قام خالد سمير بتسليم تمرين 1: استخدام المتغيرات", time: "منذ 10 دقائق", read: false },
  { id: "n-2", text: "تقييم جديد 5 نجوم على دورة الذكاء الاصطناعي للمبتدئين", time: "منذ ساعة", read: false },
  { id: "n-3", text: "تم إصدار شهادة جديدة للطالبة سارة علي", time: "منذ 3 ساعات", read: false },
  { id: "n-4", text: "طالب جديد انضم إلى دورة تطوير الويب المتكامل", time: "أمس", read: true },
  { id: "n-5", text: "تم تحويل أرباح شهر يناير إلى حسابك", time: "منذ يومين", read: true },
  { id: "n-6", text: "انضمت رنا فوزي إلى دورة تعلم اللغة الإنجليزية للمحترفين", time: "منذ 3 أيام", read: true },
  { id: "n-7", text: "تقييم جديد 4 نجوم على دورة تطوير الويب المتكامل", time: "منذ 4 أيام", read: true },
];
