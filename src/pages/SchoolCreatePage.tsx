// modules/school/pages/SchoolCreatePage.tsx
import { useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { API } from "../services/api";

const SchoolCreatePage = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.name || !form.username || !form.password) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/admin/create-school",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("School created successfully ✅");

      // reset form
      setForm({
        name: "",
        username: "",
        password: "",
      });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error creating school");
    }

    setLoading(false);
  };

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Create School
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="School Name"
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
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loading ? "Creating..." : "Create School"}
          </button>
        </form>
      </div>
    </AppLayout>
  );
};

export default SchoolCreatePage;