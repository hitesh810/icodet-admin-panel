import { useEffect, useState } from "react";
import { createLicence } from "../services/licence.service";
import { getSchools } from "../services/school.service";

const SingleCreate = () => {
  const [form, setForm] = useState({
    licence_key: "",
    licence_type: "STUDENT",
    school_id: "",
  });

  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // fetch schools
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await getSchools();
        setSchools(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSchools();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.licence_key || !form.school_id) {
      alert("All fields required");
      return;
    }

    setLoading(true);

    try {
      await createLicence({
        licence_key: form.licence_key,
        licence_type: form.licence_type,
        school_id: Number(form.school_id),
      });

      alert("Licence created ✅");

      setForm({
        licence_key: "",
        licence_type: "STUDENT",
        school_id: "",
      });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Create Licence
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Licence Key */}
        <input
          placeholder="Licence Key"
          value={form.licence_key}
          onChange={(e) =>
            setForm({ ...form, licence_key: e.target.value })
          }
          className="border px-3 py-2 rounded"
        />

        {/* Licence Type */}
        <select
          value={form.licence_type}
          onChange={(e) =>
            setForm({ ...form, licence_type: e.target.value })
          }
          className="border px-3 py-2 rounded"
        >
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
          <option value="SYSTEM">System</option>
        </select>

        {/* School Dropdown */}
        <select
          value={form.school_id}
          onChange={(e) =>
            setForm({ ...form, school_id: e.target.value })
          }
          className="border px-3 py-2 rounded"
        >
          <option value="">Select School</option>

          {schools.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Submit */}
        <button
          disabled={loading}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Creating..." : "Create Licence"}
        </button>
      </form>
    </div>
  );
};

export default SingleCreate;