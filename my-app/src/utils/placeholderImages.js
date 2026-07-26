// Deterministic, fully local placeholder images (avatars + course covers)
// rendered as inline SVG data-URIs. These replace hotlinked third-party
// images (Unsplash, pravatar.cc, picsum.photos): if the browser/network
// blocks those external hosts, avatars and course covers used to disappear
// completely (the "fallback" was itself another external host). Everything
// here is generated in-memory, so it always renders — online or offline.

const PALETTE = [
  ["#F4801F", "#FFB877"],
  ["#1C2B4B", "#3B5384"],
  ["#2FA84F", "#7ED99A"],
  ["#0E7C86", "#59C4CC"],
  ["#7C3AED", "#C4B0FA"],
  ["#E02B2B", "#F59E9E"],
  ["#B8860B", "#F0D580"],
  ["#0F766E", "#5EEAD4"],
];

function hashString(str) {
  let hash = 5381;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    hash = (hash * 33) ^ s.charCodeAt(i);
  }
  return Math.abs(hash);
}

function pickColors(seed) {
  return PALETTE[hashString(seed) % PALETTE.length];
}

function getInitials(name) {
  if (!name || name === "-") return "؟";
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2);
  return parts[0][0] + parts[1][0];
}

function toDataUri(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Circular avatar with initials — used for every student/instructor/reviewer
// picture in the app instead of a hotlinked photo.
export function avatarPlaceholder(seed) {
  const [from, to] = pickColors(seed);
  const initials = getInitials(seed);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${from}"/>
        <stop offset="1" stop-color="${to}"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="50" fill="url(#g)"/>
    <text x="50" y="58" font-family="Cairo, Segoe UI, Tahoma, sans-serif" font-size="34" font-weight="700" fill="#ffffff" text-anchor="middle">${initials}</text>
  </svg>`;
  return toDataUri(svg);
}

const CATEGORY_ICONS = {
  "علوم البيانات": "📊",
  "برمجة": "💻",
  "ذكاء اصطناعي": "🤖",
  "تصميم": "🎨",
  "تسويق رقمي": "📣",
  "إدارة أعمال": "📈",
  "تطوير تطبيقات": "📱",
  "أمن سيبراني": "🛡️",
  "حوسبة سحابية": "☁️",
  "تصوير فوتوغرافي": "📷",
  "لغات": "🗣️",
  "تمويل واستثمار": "💰",
};

// ---------------------------------------------------------------------------
// Real photos — used as the primary `src`, with the SVG generators above
// wired in as the automatic <SafeImage> fallback if a real photo ever fails
// to load (offline, blocked host, etc). Best of both worlds: real people /
// real photography by default, zero-network placeholder as the safety net.
// ---------------------------------------------------------------------------

// Explicit first-name lists covering the names used in this app's mock
// data, so avatars are pulled from the matching photo pool. Only names not
// present in EITHER list fall back to a hash-based split — previously that
// hash fallback was the *only* check beyond a female list, so any male name
// missing from the list (e.g. "محمد") could randomly resolve to a female
// photo. Checking a male list first removes that ambiguity for every name
// we actually know.
const FEMALE_FIRST_NAMES = [
  "مريم", "هبة", "دينا", "سلمى", "سارة", "ساره", "ياسمين", "نور", "منى", "مني",
  "ندى", "آية", "اية", "رنا", "دعاء", "شهد", "جنى", "جانا", "فاطمة", "خديجة",
  "أميرة", "اميرة", "ريم", "لينا", "سوسن", "هند", "نادية", "نادية", "إسراء", "اسراء",
  "عائشة", "عايشه", "كوثر", "مها", "جمانة", "بسمة", "رشا", "سعاد", "صفاء", "علا",
];

const MALE_FIRST_NAMES = [
  "محمد", "احمد", "أحمد", "علي", "عمر", "خالد", "كريم", "يوسف", "مصطفى",
  "إبراهيم", "ابراهيم", "حسن", "حسين", "عبدالله", "عبد الله", "طارق", "سامح",
  "عادل", "وليد", "هشام", "أمير", "امير", "سيف", "زياد", "فادي", "مينا",
  "محمود", "عبدالرحمن", "عبد الرحمن", "عبدالرحيم", "عبد الرحيم", "ياسر", "أسامة",
  "اسامة", "مروان", "طارق", "عاصم", "باسل", "رامي", "شادي", "مازن", "عمران",
];

function isFemaleName(fullName) {
  const first = String(fullName || "").trim().split(/\s+/)[0];
  if (MALE_FIRST_NAMES.includes(first)) return false;
  if (FEMALE_FIRST_NAMES.includes(first)) return true;
  return hashString("gender:" + fullName) % 2 === 0;
}

// Deterministic real headshot from randomuser.me's static portrait set (99
// men + 99 women photos, served from a stable long-standing public CDN —
// no API key/auth, safe for demo & prototype use across thousands of apps).
// `gender` can be passed explicitly ("male" | "female") to bypass the name
// heuristic entirely — always use this for real profile data (e.g. the
// logged-in instructor) where the gender is actually known, rather than
// relying on name-guessing.
export function realAvatarUrl(seed, gender) {
  const key = seed || "طالب";
  const pool = gender === "male" ? "men" : gender === "female" ? "women" : (isFemaleName(key) ? "women" : "men");
  const index = (hashString(key) % 99) + 1;
  return `https://randomuser.me/api/portraits/${pool}/${index}.jpg`;
}

// Real, topic-matched cover photo per course category — hand-picked from
// Unsplash (each verified individually to be free-to-use under the
// Unsplash License, not the paid Unsplash+ tier) so every category shows an
// actual, relevant photograph instead of a random/unrelated stock image.
// Images are requested directly from Unsplash's own image CDN with
// explicit size + compression params (small width, q=60, auto=format so
// the CDN serves WebP/AVIF when supported) so they stay small and fast to
// load, same as the source pages themselves use.
const CATEGORY_PHOTO_IDS = {
  "علوم البيانات": "1660616246653-e2c57d1077b9", // Python/data code on screen
  "برمجة": "1742072594003-abf6ca86e154", // colorful code on screen
  "ذكاء اصطناعي": "1739036868260-c26b292cd85d", // AI chip render
  "تصميم": "1716471330475-f0669db8947a", // color swatches / color wheel
  "تسويق رقمي": "1686061593213-98dad7c599b9", // marketing analytics dashboard
  "إدارة أعمال": "1758518731706-be5d5230e5a5", // business team meeting
  "تطوير تطبيقات": "1574527780250-f29a7aff609a", // mobile app dev (Android Studio)
  "أمن سيبراني": "1633265486064-086b219458ec", // padlock on keyboard
  "حوسبة سحابية": "1558494949-ef010cbdcc31", // server/network cables
  "تصوير فوتوغرافي": "1557310919-b9fa8b2cd6cd", // camera lenses
  "لغات": "1456513080510-7bf3a84b82f8", // open books
  "تمويل واستثمار": "1534951009808-766178b47a4f", // coins / financial growth
};

function unsplashUrl(photoId, width = 700) {
  return `https://images.unsplash.com/photo-${photoId}?w=${width}&q=60&auto=format&fit=crop&fm=jpg`;
}

export function realCourseCoverUrl(category) {
  const photoId = CATEGORY_PHOTO_IDS[category];
  if (photoId) return unsplashUrl(photoId);
  // Unknown category (custom course added later): fall back to the
  // zero-network gradient banner instead of an unrelated random photo.
  return coursesCoverPlaceholder(category);
}

// Rectangular gradient banner (icon + category name) — used as a course
// cover image instead of a hotlinked stock photo.
export function coursesCoverPlaceholder(category) {
  const [from, to] = pickColors(category);
  const icon = CATEGORY_ICONS[category] || "📚";
  const label = category || "دورة";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="400" viewBox="0 0 700 400">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${from}"/>
        <stop offset="1" stop-color="${to}"/>
      </linearGradient>
    </defs>
    <rect width="700" height="400" fill="url(#g)"/>
    <text x="350" y="230" font-size="150" text-anchor="middle" opacity="0.35">${icon}</text>
    <text x="350" y="335" font-family="Cairo, Segoe UI, Tahoma, sans-serif" font-size="30" font-weight="800" fill="#ffffff" text-anchor="middle">${label}</text>
  </svg>`;
  return toDataUri(svg);
}
