import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiTrash2, FiEdit2, FiEye } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { statCards, getStatus } from "../../data/mockData";
import StatCard from "../../components/StatCard/StatCard";
import FilterBar from "../../components/FilterBar/FilterBar";
import Badge from "../../components/Badge/Badge";
import Pagination from "../../components/Pagination/Pagination";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import styles from "./AssignmentsList.module.css";

const PAGE_SIZE = 9;

export default function AssignmentsList() {
  const { assignments, deleteAssignment } = useApp();
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState(null);

  const filtered = useMemo(() => {
    return assignments.filter((a) => {
      const matchesStatus = statusFilter === "all" || a.status === statusFilter;
      const matchesSearch =
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.course.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [assignments, statusFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const statusOptions = [
    { value: "review", label: "قيد المراجعة" },
    { value: "completed", label: "مكتمل" },
    { value: "late", label: "متأخرة" },
  ];

  const confirmDelete = () => {
    deleteAssignment(toDelete);
    setToDelete(null);
  };

  return (
    <div>
      <div className={styles.headerRow}>
        <Button icon={<FiPlus />} onClick={() => navigate("/assignments/new")}>
          إضافة التكليف
        </Button>
        <div className={styles.titleBlock}>
          <h1>التكليفات</h1>
          <p>إدارة مهام و تمارين الطلاب</p>
        </div>
      </div>

      <div className={styles.statsRow}>
        {statCards.map((s) => (
          <StatCard key={s.id} id={s.id} icon={s.icon} label={s.label} value={s.value} />
        ))}
      </div>

      <FilterBar
        statusFilter={statusFilter}
        onStatusChange={(v) => {
          setStatusFilter(v);
          setPage(1);
        }}
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        statusOptions={statusOptions}
      />

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>عنوان التكليف</th>
              <th>الدورة</th>
              <th>تاريخ الإنشاء</th>
              <th>تاريخ الاستلام</th>
              <th>عدد التسليمات</th>
              <th>الحالة</th>
              <th>التحكم</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((a) => (
              <tr key={a.id}>
                <td className={styles.titleCell}>{a.title}</td>
                <td className={styles.courseCell}>{a.course}</td>
                <td>{a.createdAt}</td>
                <td>{a.dueDate}</td>
                <td>
                  {a.submissionsCount}/{a.submissionsTotal}
                </td>
                <td>
                  <Badge label={getStatus(a.status).label} color={getStatus(a.status).color} />
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.iconBtn}
                      onClick={() => setToDelete(a.id)}
                      aria-label="حذف"
                    >
                      <FiTrash2 />
                    </button>
                    <button
                      className={styles.iconBtn}
                      onClick={() => navigate(`/assignments/${a.id}/edit`)}
                      aria-label="تعديل"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className={styles.iconBtn}
                      onClick={() => navigate(`/assignments/${a.id}`)}
                      aria-label="عرض"
                    >
                      <FiEye />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td colSpan={7} className={styles.empty}>
                  لا توجد تكليفات مطابقة
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
        totalItems={filtered.length}
        pageSize={PAGE_SIZE}
      />

      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="تأكيد الحذف"
        footer={
          <>
            <Button variant="ghost" onClick={() => setToDelete(null)}>
              إلغاء
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              حذف
            </Button>
          </>
        }
      >
        هل أنت متأكد أنك تريد حذف هذا التكليف؟ لا يمكن التراجع عن هذا الإجراء.
      </Modal>
    </div>
  );
}
