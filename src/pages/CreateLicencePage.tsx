import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { API } from "../services/api";

const CreateLicencePage = () => {
  const navigate = useNavigate();

  const [schools, setSchools] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [volumes, setVolumes] = useState<any[]>([]);

  const [form, setForm] = useState({
    school_id: "",
    class_id: "",
    volume_id: "",
    licence_key: "",
    password: "",
    name: "",
    role: "STUDENT",
    dob: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔥 LOAD DATA
  useEffect(() => {
    API.get("/admin/schools").then((res) =>
      setSchools(res.data.data)
    );
    API.get("/admin/classes").then((res) =>
      setClasses(res.data.data)
    );
    API.get("/admin/volumes").then((res) =>
      setVolumes(res.data.data)
    );
  }, []);

  // 🔥 CHANGE
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 GENERATE KEY
  const generateKey = () => {
    const key =
      "LIC-" +
      Math.random().toString(36).substring(2, 8).toUpperCase();

    setForm({ ...form, licence_key: key });
  };

  // 🔥 SUBMIT
  const handleSubmit = async () => {
    if (
      !form.school_id ||
      !form.class_id ||
      !form.volume_id ||
      !form.licence_key ||
      !form.password ||
      !form.name ||
      !form.role
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/admin/licences", form);

      alert(res.data.message);

      navigate("/licences"); // 🔥 redirect

    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">

        <h1 className="text-2xl font-semibold">
          Create Licence
        </h1>

        <div className="bg-white p-6 rounded shadow space-y-4">

          {/* SCHOOL */}
          <select
            name="school_id"
            value={form.school_id}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">Select School</option>
            {schools.map((s: any) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          {/* CLASS */}
          <select
            name="class_id"
            value={form.class_id}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">Select Class</option>
            {classes.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* VOLUME */}
          <select
            name="volume_id"
            value={form.volume_id}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">Select Volume</option>
            {volumes.map((v: any) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>

          {/* LICENCE KEY */}
          <div className="flex gap-2">
            <input
              name="licence_key"
              value={form.licence_key}
              onChange={handleChange}
              placeholder="Licence Key"
              className="border px-3 py-2 rounded w-full"
            />
            <button
              onClick={generateKey}
              className="bg-gray-600 text-white px-3 rounded"
            >
              Generate
            </button>
          </div>

          {/* PASSWORD */}
          <input
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />

          {/* NAME */}
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />

          {/* ROLE */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
            <option value="SYSTEM">System</option>
          </select>

          {/* DOB */}
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Creating..." : "Create Licence"}
          </button>

        </div>

      </div>
    </AppLayout>
  );
};

export default CreateLicencePage;