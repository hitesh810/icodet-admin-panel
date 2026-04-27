// components/BulkUpload.tsx

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { uploadLicences } from "../services/licence.service";

const BulkUpload = ({ refresh }: any) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select file");
      return;
    }

    setLoading(true);

    try {
      await uploadLicences(file);
      alert("Upload successful ✅");
      setFile(null);
      refresh && refresh();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">
      <h2 className="text-md font-semibold mb-3">
        Bulk Upload Licences
      </h2>

      {/* Drag & Drop Box */}
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-green-500 transition">
        
        <UploadCloud className="text-gray-400 mb-2" size={30} />

        <p className="text-sm text-gray-500">
          Click to upload or drag & drop Excel file
        </p>

        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          className="hidden"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />
      </label>

      {/* File Preview */}
      {file && (
        <div className="mt-3 text-sm text-gray-700">
          Selected: <span className="font-medium">{file.name}</span>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default BulkUpload;