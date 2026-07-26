import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBookOpen, FiUsers, FiAward, FiDollarSign, FiArrowLeft } from "react-icons/fi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  statCards,
  assignments,
  getStatus,
  courseStats,
  studentStats,
  certificateStats,
  buildProfitStats,
  monthlyEarnings,
} from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import StatCard from "../../components/StatCard/StatCard";
import Badge from "../../components/Badge/Badge";
import styles from "./Overview.module.css";

const PIE_COLORS = ["#F4801F", "#1C2B4B", "#2FA84F", "#0E7C86", "#7C3AED", "#E02B2B", "#B8860B"];

function ChartTooltip({ active, payload, label, suffix }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className={styles.tooltip}>
      <strong>{label}</strong>
      <span>
        {payload[0].value.toLocaleString()} {suffix}
      </span>
    </div>
  );
}

export default function Overview() {
  const { user, profit, courses } = useApp();
  const navigate = useNavigate();
  const recent = assignments.slice(0, 5);
  const profitStats = buildProfitStats(profit);

  const quickLinks = [
    { to: "/courses", label: "دوراتي", value: courseStats[0].value, icon: <FiBookOpen /> },
    { to: "/students", label: "الطلاب", value: studentStats[0].value, icon: <FiUsers /> },
    { to: "/certificates", label: "الشهادات", value: certificateStats[0].value, icon: <FiAward /> },
    { to: "/profits", label: "الأرباح", value: profitStats[0].value, icon: <FiDollarSign /> },
  ];

  const categoryDistribution = useMemo(() => {
    const counts = {};
    courses.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + (c.students || 0);
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [courses]);

  return (
    <div>
      <motion.div
        className={styles.welcome}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1>مرحباً، {user.name} 👋</h1>
        <p>هذه نظرة عامة سريعة على نشاطك اليوم</p>
      </motion.div>

      <div className={styles.statsRow}>
        {statCards.map((s) => (
          <StatCard key={s.id} id={s.id} icon={s.icon} label={s.label} value={s.value} />
        ))}
      </div>

      <div className={styles.quickLinksRow}>
        {quickLinks.map((q, i) => (
          <motion.button
            key={q.to}
            className={styles.quickCard}
            onClick={() => navigate(q.to)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            whileHover={{ y: -3 }}
          >
            <div className={styles.quickIcon}>{q.icon}</div>
            <div className={styles.quickBody}>
              <span className={styles.quickValue}>{q.value}</span>
              <span className={styles.quickLabel}>{q.label}</span>
            </div>
            <FiArrowLeft className={styles.quickArrow} />
          </motion.button>
        ))}
      </div>

      <div className={styles.splitRow}>
        <div className={styles.chartCard}>
          <div className={styles.recentHeader}>
            <h3>اتجاه الأرباح</h3>
            <button onClick={() => navigate("/profits")}>عرض التفاصيل</button>
          </div>
          <div className={styles.rechartsWrap}>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyEarnings} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="earningsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F4801F" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#F4801F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} width={0} />
                <Tooltip content={<ChartTooltip suffix="ج.م" />} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#F4801F"
                  strokeWidth={3}
                  fill="url(#earningsFill)"
                  animationDuration={900}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.recentCard}>
          <div className={styles.recentHeader}>
            <h3>أحدث التكليفات</h3>
            <button onClick={() => navigate("/assignments")}>عرض الكل</button>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>عنوان التكليف</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((a) => (
                <tr key={a.id} onClick={() => navigate(`/assignments/${a.id}`)}>
                  <td>{a.title}</td>
                  <td>
                    <Badge label={getStatus(a.status).label} color={getStatus(a.status).color} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.splitRow}>
        <div className={styles.chartCard}>
          <div className={styles.recentHeader}>
            <h3>توزيع الطلاب حسب التخصص</h3>
            <button onClick={() => navigate("/courses")}>كل الدورات</button>
          </div>
          <div className={styles.pieRow}>
            <ResponsiveContainer width="55%" height={200}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  animationDuration={900}
                >
                  {categoryDistribution.map((entry, i) => (
                    <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip suffix="طالب" />} />
              </PieChart>
            </ResponsiveContainer>
            <ul className={styles.pieLegend}>
              {categoryDistribution.map((entry, i) => (
                <li key={entry.name}>
                  <span className={styles.legendDot} style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className={styles.legendLabel}>{entry.name}</span>
                  <span className={styles.legendValue}>{entry.value.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.recentCard}>
          <div className={styles.recentHeader}>
            <h3>نظرة سريعة على الأداء</h3>
          </div>
          <ul className={styles.insightList}>
            <li>
              <span className={styles.insightLabel}>متوسط تقييم الدورات</span>
              <strong>{courseStats[2]?.value ?? "—"} ⭐</strong>
            </li>
            <li>
              <span className={styles.insightLabel}>الدورات النشطة</span>
              <strong>{courseStats[0]?.value}</strong>
            </li>
            <li>
              <span className={styles.insightLabel}>طلاب جدد هذا الشهر</span>
              <strong>{studentStats[2]?.value}</strong>
            </li>
            <li>
              <span className={styles.insightLabel}>شهادات صادرة هذا الشهر</span>
              <strong>{certificateStats[3]?.value}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
