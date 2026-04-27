import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { API } from "../services/api";

const EditVolumePage = () => {
  const { classId } = useParams();
  const navigate = useNavigate();

  const [classData, setClassData] = useState<any>(null);
  const [volume, setVolume] = useState<any>(null);
  const [volumeName, setVolumeName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 FETCH CLASS + VOLUME
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get classes
        const classRes = await API.get("/admin/classes");
        const cls = classRes.data.data.find(
          (c: any) => c.id === Number(classId)
        );
        setClassData(cls);

        // get volume for this class
        const volRes = await API.get(
          `/admin/volumes?class_id=${classId}`
        );

        const vol = volRes.data.data[0];

        if (vol) {
          setVolume(vol);
          setVolumeName(vol.name);
        }
      } catch (err) {
        setError("Failed to load data");
      }
    };

    fetchData();
  }, [classId]);

  // 💾 SAVE
  const handleSave = async () => {
    setError("");

    if (!volumeName.trim()) {
      setError("Volume name required");
      return;
    }

    try {
      setLoading(true);

      if (volume) {
        // 🔥 UPDATE
        await API.put(`/admin/volumes/${volume.id}`, {
          name: volumeName,
        });
      } else {
        // 🔥 CREATE
        await API.post("/admin/volumes", {
          name: volumeName,
          class_id: classId,
        });
      }

      navigate("/class-volume");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error saving");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto space-y-6">

        <h1 className="text-2xl font-semibold">
          {volume ? "Edit Volume" : "Assign Volume"}
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        <div className="bg-white p-4 rounded shadow space-y-4">

          {/* CLASS */}
          <div>
            <label className="block text-sm mb-1">Class</label>
            <input
              value={classData?.name || ""}
              disabled
              className="border px-3 py-2 rounded w-full bg-gray-100"
            />
          </div>

          {/* VOLUME */}
          <div>
            <label className="block text-sm mb-1">Volume Name</label>
            <input
              value={volumeName}
              onChange={(e) => setVolumeName(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading
                ? "bg-gray-400"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>
      </div>
    </AppLayout>
  );
};

export default EditVolumePage;