import { useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { API } from "../services/api";

const BulkUploadSchoolPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // 📂 file select
  const handleFileChange = (e: any) => {
    const selected = e.target.files[0];
    setFile(selected);
  };

  // 🖱 drag drop
  const handleDrop = (e: any) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  // 🚀 upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/admin/bulk-upload-schools",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data.data);

      alert("Upload successful ✅");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Upload failed");
    }

    setLoading(false);
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">

        <h1 className="text-2xl font-semibold">
          Bulk Upload Schools
        </h1>

        {/* 📦 DROP AREA */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 p-8 text-center rounded-xl bg-white"
        >
          <p className="text-gray-500">
            Drag & Drop Excel file here
          </p>

          <p className="text-sm text-gray-400 mt-2">
            or click to select file
          </p>

          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="mt-4"
          />
        </div>

        {/* FILE NAME */}
        {file && (
          <div className="bg-gray-100 p-3 rounded">
            Selected File:{" "}
            <span className="font-medium">{file.name}</span>
          </div>
        )}

        {/* UPLOAD BUTTON */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {/* RESULT */}
        {result && (
          <div className="bg-green-100 p-4 rounded">
            <p className="text-green-700 font-medium">
              Upload Result
            </p>

            <p>✅ Created: {result.created}</p>
            <p>⚠️ Skipped: {result.skipped}</p>
          </div>
        )}

      </div>
    </AppLayout>
  );
};

export default BulkUploadSchoolPage;