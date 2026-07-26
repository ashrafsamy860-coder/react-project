import React, { useRef, useState } from "react";
import { FiUploadCloud, FiFile, FiX } from "react-icons/fi";
import styles from "./FileUpload.module.css";

export default function FileUpload({ label, hint = "PDF, DOC, PPT, ZIP بصيغة", onFileSelected }) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelected && onFileSelected(file);
    }
  };

  return (
    <div className={styles.wrap}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.dropzone}>
        {!fileName ? (
          <>
            <button type="button" className={styles.uploadBtn} onClick={() => inputRef.current.click()}>
              <FiUploadCloud />
              رفع الملفات
            </button>
            <span className={styles.hint}>{hint}</span>
          </>
        ) : (
          <div className={styles.fileRow}>
            <FiFile />
            <span className={styles.fileName}>{fileName}</span>
            <button type="button" className={styles.removeBtn} onClick={() => setFileName(null)}>
              <FiX />
            </button>
          </div>
        )}
        <input ref={inputRef} type="file" hidden onChange={handleChange} />
      </div>
    </div>
  );
}
