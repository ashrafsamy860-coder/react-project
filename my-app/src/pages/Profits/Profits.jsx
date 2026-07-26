import React, { useState } from "react";
import { FiDownload, FiArrowUpRight, FiArrowDownRight, FiCreditCard } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { monthlyEarnings, buildProfitStats, getStatus } from "../../data/mockData";
import StatCard from "../../components/StatCard/StatCard";
import Badge from "../../components/Badge/Badge";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import styles from "./Profits.module.css";

export default function Profits() {
  const { profit, transactions, withdrawProfit } = useApp();
  const max = Math.max(...monthlyEarnings.map((m) => m.amount));
  const profitStats = buildProfitStats(profit);

  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bank");

  const handleWithdraw = () => {
    const ok = withdrawProfit(Number(amount));
    if (ok) {
      setAmount("");
      setWithdrawOpen(false);
    }
  };

  return (
    <div>
      <div className={styles.headerRow}>
        <Button icon={<FiDownload />} onClick={() => setWithdrawOpen(true)}>
          سحب الأرباح
        </Button>
        <div className={styles.titleBlock}>
          <h1>الأرباح</h1>
          <p>متابعة أرباحك من الدورات التدريبية</p>
        </div>
      </div>

      <div className={styles.statsRow}>
        {profitStats.map((s) => (
          <StatCard key={s.id} id={s.id} icon={s.icon} label={s.label} value={s.value} />
        ))}
      </div>

      <div className={styles.chartCard}>
        <h3>الأرباح الشهرية</h3>
        <div className={styles.chart}>
          {monthlyEarnings.map((m) => (
            <div key={m.month} className={styles.barCol}>
              <span className={styles.barValue}>{m.amount.toLocaleString()}</span>
              <div className={styles.barTrack}>
                <div className={styles.bar} style={{ height: `${(m.amount / max) * 100}%` }} />
              </div>
              <span className={styles.barLabel}>{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tableWrap}>
        <h3 className={styles.tableTitle}>آخر المعاملات</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>الوصف</th>
              <th>الطالب</th>
              <th>التاريخ</th>
              <th>المبلغ</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className={styles.descCell} title={t.desc}>{t.desc}</td>
                <td>{t.student}</td>
                <td>{t.date}</td>
                <td className={t.amount < 0 ? styles.negative : styles.positive}>
                  {t.amount < 0 ? <FiArrowDownRight /> : <FiArrowUpRight />}
                  {Math.abs(t.amount).toLocaleString()} ج.م
                </td>
                <td>
                  <Badge label={getStatus(t.status).label} color={getStatus(t.status).color} />
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.empty}>لا توجد معاملات بعد</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        title="سحب الأرباح"
        footer={
          <>
            <Button variant="ghost" onClick={() => setWithdrawOpen(false)}>إلغاء</Button>
            <Button icon={<FiCreditCard />} onClick={handleWithdraw}>تأكيد السحب</Button>
          </>
        }
      >
        <div className={styles.withdrawInfo}>
          الرصيد المتاح للسحب: <strong>{profit.pending.toLocaleString()} ج.م</strong>
        </div>
        <div className={styles.formField}>
          <label>المبلغ المطلوب سحبه</label>
          <input
            type="number"
            placeholder="أدخل المبلغ"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            max={profit.pending}
          />
        </div>
        <div className={styles.formField}>
          <label>طريقة السحب</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="bank">تحويل بنكي</option>
            <option value="wallet">محفظة إلكترونية</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
      </Modal>
    </div>
  );
}
