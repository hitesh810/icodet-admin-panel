import { useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { API } from "../services/api";

const SchoolCreatePage = () => {
  // 🟢 SINGLE CREATE
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    school_code: "",
  });

  // 🟢 BULK
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🚀 SINGLE SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.username ||
      !form.password ||
      !form.school_code
    ) {
      alert("All fields required");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await API.post("/admin/create-school", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("School created ✅");

      setForm({
        name: "",
        username: "",
        password: "",
        school_code: "",
      });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error");
    }

    setLoading(false);
  };

  // 📂 FILE SELECT
  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  // 🚀 BULK UPLOAD
  const handleBulkUpload = async () => {
    if (!file) {
      alert("Select file");
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
          },
        }
      );

      setResult(res.data.data);

      alert("Bulk upload done ✅");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error");
    }

    setLoading(false);
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-8">

        {/* 🟢 SINGLE CREATE */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Create School
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="School Name"
              className="border px-3 py-2 rounded"
            />

            <input
              name="school_code"
              value={form.school_code}
              onChange={handleChange}
              placeholder="School Code (Unique)"
              className="border px-3 py-2 rounded"
            />

            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="border px-3 py-2 rounded"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="border px-3 py-2 rounded"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white py-2 rounded"
            >
              {loading ? "Creating..." : "Create School"}
            </button>

          </form>
        </div>

        {/* 🔵 BULK UPLOAD */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Bulk Upload Schools
          </h2>

          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="mb-3"
          />

          {file && (
            <p className="text-sm mb-2">
              Selected: {file.name}
            </p>
          )}

          <button
            onClick={handleBulkUpload}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>

          {/* RESULT */}
          {result && (
            <div className="mt-4 bg-green-100 p-3 rounded">
              <p>✅ Created: {result.created}</p>
              <p>⚠️ Skipped: {result.skipped}</p>
            </div>
          )}
        </div>

      </div>
    </AppLayout>
  );
};

export default SchoolCreatePage;