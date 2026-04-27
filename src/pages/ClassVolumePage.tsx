import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { API } from "../services/api";

const ClassVolumePage = () => {
    const navigate = useNavigate();

    const [classes, setClasses] = useState<any[]>([]);
    const [volumes, setVolumes] = useState<any[]>([]);

    const [className, setClassName] = useState("");
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    // 🔥 FETCH
    const fetchData = async () => {
        const cls = await API.get("/admin/classes");
        const vol = await API.get("/admin/volumes");

        setClasses(cls.data.data);
        setVolumes(vol.data.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ➕ CREATE CLASS
    const handleCreateClass = async () => {
        setError("");

        if (!className.trim()) {
            setError("Class name required");
            return;
        }

        try {
            setLoading(true);
            await API.post("/admin/classes", { name: className });

            setClassName("");
            fetchData();
        } catch (err: any) {
            setError(err.response?.data?.message || "Error creating class");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <div className="space-y-6">

                <h1 className="text-2xl font-semibold">
                    Class & Volume Management
                </h1>

                {/* ❌ ERROR */}
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded">
                        {error}
                    </div>
                )}

                {/* 🚨 CASE 1: NO CLASS */}
                {classes.length === 0 && (
                    <div className="bg-white p-8 rounded shadow text-center space-y-4">

                        <h2 className="text-lg font-semibold">
                            No Classes Found
                        </h2>

                        <p className="text-gray-500">
                            Start by creating your first class
                        </p>

                        <div className="flex justify-center gap-2">
                            <input
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                placeholder="Enter class name"
                                className="border px-3 py-2 rounded"
                            />

                            <button
                                onClick={handleCreateClass}
                                className="bg-blue-600 text-white px-4 rounded"
                            >
                                {loading ? "Creating..." : "Create"}
                            </button>
                        </div>

                    </div>
                )}

                {/* 🚨 CASE 2 & 3: CLASSES EXIST */}
                {classes.length > 0 && (
                    <div className="bg-white p-4 rounded shadow">

                        <h2 className="mb-4 font-medium text-lg">
                            Class → Volume Mapping
                        </h2>

                        {classes.map((c) => {
                            const volume = volumes.find((v) => v.class_id === c.id);

                            return (
                                <div
                                    key={c.id}
                                    className="border rounded-lg p-4 mb-3 flex justify-between items-center"
                                >
                                    <div>
                                        <h3 className="font-semibold">{c.name}</h3>

                                        {volume ? (
                                            <p className="text-green-600 text-sm">
                                                Volume: {volume.name}
                                            </p>
                                        ) : (
                                            <p className="text-gray-500 text-sm">
                                                No volume assigned
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => navigate(`/volumes/edit/${c.id}`)}
                                        className="text-blue-600"
                                    >
                                        {volume ? "Edit" : "Assign"}
                                    </button>
                                </div>
                            );
                        })}

                    </div>
                )}

                {/* ➕ QUICK ADD CLASS (BOTTOM) */}
                {classes.length > 0 && (
                    <div className="bg-white p-4 rounded shadow flex gap-2">

                        <input
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            placeholder="Add new class"
                            className="border px-3 py-2 rounded"
                        />

                        <button
                            onClick={handleCreateClass}
                            className="bg-blue-600 text-white px-4 rounded"
                        >
                            Add
                        </button>

                    </div>
                )}

            </div>
        </AppLayout>
    );
};

export default ClassVolumePage;