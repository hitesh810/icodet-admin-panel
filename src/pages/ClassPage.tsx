import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { API } from "../services/api";

const ClassPage = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchClasses = async () => {
    const res = await API.get("/admin/classes");
    setClasses(res.data.data);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return;

    setLoading(true);
    await API.post("/admin/classes", { name });
    setName("");
    fetchClasses();
    setLoading(false);
  };

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold">Class Management</h1>

        {/* ADD */}
        <div className="bg-white p-4 rounded shadow flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter class name"
            className="border px-3 py-2 rounded w-64"
          />

          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 rounded"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        {/* LIST */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="mb-3 font-medium">Class List</h2>

          {classes.length === 0 ? (
            <p className="text-gray-500">No classes found</p>
          ) : (
            classes.map((c) => (
              <div key={c.id} className="border-b py-2">
                {c.name}
              </div>
            ))
          )}
        </div>

      </div>
    </AppLayout>
  );
};

export default ClassPage;