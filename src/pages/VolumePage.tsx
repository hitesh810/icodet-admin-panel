import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { API } from "../services/api";

const VolumePage = () => {
  const [volumes, setVolumes] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchVolumes = async () => {
    const res = await API.get("/admin/volumes");
    setVolumes(res.data.data);
  };

  useEffect(() => {
    fetchVolumes();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return;

    setLoading(true);
    await API.post("/admin/volumes", { name });
    setName("");
    fetchVolumes();
    setLoading(false);
  };

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold">Volume Management</h1>

        {/* ADD */}
        <div className="bg-white p-4 rounded shadow flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter volume name"
            className="border px-3 py-2 rounded w-64"
          />

          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 rounded"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        {/* LIST */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="mb-3 font-medium">Volume List</h2>

          {volumes.length === 0 ? (
            <p className="text-gray-500">No volumes found</p>
          ) : (
            volumes.map((v) => (
              <div key={v.id} className="border-b py-2">
                {v.name}
              </div>
            ))
          )}
        </div>

      </div>
    </AppLayout>
  );
};

export default VolumePage;