import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api";

const QuestionBankList = () => {
  const [volumes, setVolumes] = useState<any[]>([]);
  const [chapters, setChapters] = useState<any[]>([]);
  const [volumeId, setVolumeId] = useState<number | null>(null);
  const [chapterId, setChapterId] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/admin/volumes").then((res) => setVolumes(res.data.data));
  }, []);

  useEffect(() => {
    if (!volumeId) return;
    API.get(`/admin/chapters?volume_id=${volumeId}`)
      .then((res) => setChapters(res.data.data));
  }, [volumeId]);

  useEffect(() => {
    if (!chapterId) return;

    API.get(`/question-bank?chapter_id=${chapterId}`)
      .then((res) => setData(res.data.data || []));
  }, [chapterId]);

  return (
    <AppLayout>
      <div className="space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Question Bank</h1>

          <button
            onClick={() =>
              navigate("/question-bank", { state: { mode: "create" } })
            }
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Question Bank
          </button>
        </div>

        {/* FILTER */}
        <div className="bg-white p-4 rounded-xl shadow flex gap-4">

          <select
            className="border px-3 py-2 rounded-md"
            value={volumeId || ""}
            onChange={(e) => setVolumeId(Number(e.target.value))}
          >
            <option value="">Select Volume</option>
            {volumes.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>

          <select
            className="border px-3 py-2 rounded-md"
            value={chapterId || ""}
            onChange={(e) => setChapterId(Number(e.target.value))}
            disabled={!volumeId}
          >
            <option value="">Select Chapter</option>
            {chapters.map((ch) => (
              <option key={ch.id} value={ch.id}>{ch.name}</option>
            ))}
          </select>

        </div>

        {/* LIST */}
        <div className="bg-white p-4 rounded-xl shadow">

          {!chapterId ? (
            <p>Select chapter</p>
          ) : data.length === 0 ? (
            <p>No Questions Found</p>
          ) : (
            data.map((topic: any, i: number) => (
              <div
                key={i}
                className="border p-4 rounded mb-2 cursor-pointer hover:bg-gray-50 flex justify-between"
                onClick={() =>
                  navigate("/question-bank", {
                    state: {
                      mode: "edit",
                      chapterId: chapterId,
                      volumeId: volumeId,
                    },
                  })
                }
              >
                <span>📂 {topic.name}</span>
                <span>{topic.questions?.length || 0} Questions</span>
              </div>
            ))
          )}

        </div>

      </div>
    </AppLayout>
  );
};

export default QuestionBankList;