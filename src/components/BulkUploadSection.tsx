import React, { useState } from "react";
import { API } from "../services/api";

const BulkUploadSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [dragging, setDragging] = useState(false);

  // 🔥 HANDLE FILE
  const handleFile = (f: File) => {
    if (!f) return;

    if (!f.name.endsWith(".xlsx")) {
      alert("Only Excel (.xlsx) file allowed");
      return;
    }

    setFile(f);
    setResult(null);
  };

  const handleFileChange = (e: any) => {
    handleFile(e.target.files[0]);
  };

  // 🔥 DRAG DROP
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  // 🚀 UPLOAD
  const handleUpload = async () => {
    if (!file) {
      alert("Please select file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await API.post(
        "/admin/licences/bulk-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);
    } catch (err: any) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginTop: "40px",
        borderTop: "1px solid #ccc",
        paddingTop: "20px",
      }}
    >
      <h3>📂 Bulk Licence Upload</h3>

      {/* SAMPLE DOWNLOAD */}
      <a
        href="/sample-licence.xlsx"
        download
        style={{ display: "inline-block", marginBottom: "10px" }}
      >
        Download Sample Excel
      </a>

      {/* 🔥 DRAG DROP BOX */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: "2px dashed",
          borderColor: dragging ? "#007bff" : "#ccc",
          padding: "30px",
          textAlign: "center",
          borderRadius: "10px",
          cursor: "pointer",
          background: dragging ? "#f0f8ff" : "#fafafa",
          marginTop: "10px",
        }}
      >
        <p style={{ fontWeight: "bold" }}>
          Drag & Drop Excel file here
        </p>
        <p style={{ fontSize: "12px", color: "#666" }}>
          or click below
        </p>

        <input
          type="file"
          accept=".xlsx"
          id="bulkFile"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <label
          htmlFor="bulkFile"
          style={{
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Browse File
        </label>
      </div>

      {/* FILE INFO */}
      {file && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#f5f5f5",
            borderRadius: "5px",
          }}
        >
          📄 {file.name}
        </div>
      )}

      {/* ACTION BUTTON */}
      <div style={{ marginTop: "15px" }}>
        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            background: "#28a745",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h4>Result</h4>
          <p>✅ Created: {result.created}</p>
          <p>❌ Failed: {result.failed}</p>

          {/* ERROR TABLE */}
          {result.errors?.length > 0 && (
            <table border={1} cellPadding={5} style={{ marginTop: "10px", width: "100%" }}>
              <thead>
                <tr>
                  <th>Row</th>
                  <th>Error</th>
                </tr>
              </thead>
              <tbody>
                {result.errors.map((err: any, index: number) => (
                  <tr key={index}>
                    <td>{err.row}</td>
                    <td style={{ color: "red" }}>{err.error}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default BulkUploadSection;