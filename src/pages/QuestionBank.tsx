import { useState, useEffect } from "react";
import AppLayout from "../layouts/AppLayout";
import UploadYaml from "../components/UploadYaml";
import TopicCard from "../components/TopicCard";
import { API } from "../services/api";

const QuestionBank = () => {
  const [data, setData] = useState<any>(null);

  // const [classes, setClasses] = useState<any[]>([]);
  const [volumes, setVolumes] = useState<any[]>([]);
  const [chapters, setChapters] = useState<any[]>([]);

  // const [classId, setClassId] = useState<number | null>(null);
  const [volumeId, setVolumeId] = useState<number | null>(null);
  const [chapterId, setChapterId] = useState<number | null>(null);
  const [chapterName, setChapterName] = useState<string>("");

  const [isEditMode, setIsEditMode] = useState(false);

  // // 🔥 FETCH CLASSES
  // useEffect(() => {
  //   API.get("/admin/classes").then((res) => {
  //     setClasses(res.data.data);
  //   });
  // }, []);

  // 🔥 FETCH VOLUMES (on class change)
  useEffect(() => {

    setVolumeId(null);
    setChapterId(null);
    setVolumes([]);
    setChapters([]);

    API
      .get(`/admin/volumes`)
      .then((res) => setVolumes(res.data.data));
  }, []);

  // 🔥 FETCH CHAPTERS (on volume change)
  useEffect(() => {
    if (!volumeId) return;

    setChapterId(null);
    setChapters([]);

    API
      .get(`/admin/chapters?volume_id=${volumeId}`)
      .then((res) => setChapters(res.data.data));
  }, [volumeId]);

  // 🔥 LOAD QUESTION BANK (on chapter change)
  useEffect(() => {
    if (!chapterId) return;

    API
      .get(`/question-bank?chapter_id=${chapterId}`)
      .then((res) => {
        if (res.data.data.length > 0) {
          setData({ topics: res.data.data });
          setIsEditMode(true);
        } else {
          setData(null);
          setIsEditMode(false);
        }
      })
      .catch(() => {
        setData(null);
        setIsEditMode(false);
      });
  }, [chapterId]);

  // 🔥 COUNT
  const getTotalQuestions = () => {
    if (!data?.topics) return 0;

    return data.topics.reduce((acc: number, topic: any) => {
      return acc + (topic.questions?.length || 0);
    }, 0);
  };

  // 💾 SAVE / UPDATE
  const handleSave = async () => {

    if (isEditMode) {
      if (!chapterId) {
        alert("Select chapter first");
        return;
      }

      if (!data?.topics) {
        alert("No data to save");
        return;
      }

      await API.put("/question-bank/update", {
        chapter_id: chapterId,
        topics: data.topics,
      });

      alert("Updated successfully ✅");
    } else {
      await API.post("/question-bank/save", {
        volumeId: volumeId,
        chapterName: chapterName,
        topics: data.topics,
      });

      alert("Saved successfully ✅");
      setIsEditMode(true);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Question Bank</h1>

          <div className="flex items-center gap-4">
            {data && (
              <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                📊 {getTotalQuestions()} Questions
              </div>
            )}

            {data && (
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                {isEditMode ? "Update" : "Save"}
              </button>
            )}
          </div>
        </div>

        {/* 🔥 DEPENDENT DROPDOWN */}
        <div className="bg-white p-4 rounded-xl shadow flex gap-4">

          {/* CLASS */}
          {/* <select
            className="border px-3 py-2 rounded-md"
            value={classId || ""}
            onChange={(e) => setClassId(Number(e.target.value))}
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select> */}

          {/* VOLUME */}
          <select
            className="border px-3 py-2 rounded-md"
            value={volumeId || ""}
            onChange={(e) => setVolumeId(Number(e.target.value))}
          >
            <option value="">Select Volume</option>
            {volumes.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>

          {/* CHAPTER */}
          {isEditMode ? <select
            className="border px-3 py-2 rounded-md"
            value={chapterId || ""}
            onChange={(e) => setChapterId(Number(e.target.value))}
            disabled={!volumeId}
          >
            <option value="">Select Chapter</option>
            {chapters.map((ch) => (
              <option key={ch.id} value={ch.id}>
                {ch.name}
              </option>
            ))}
          </select> : <div style={{ marginBottom: "10px" }}>
            <label>Chapter Name:</label>
            <input
              type="text"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              placeholder="Enter chapter name"
              style={{
                marginLeft: "10px",
                padding: "6px",
                borderRadius: "5px",
                border: "1px solid #ccc"
              }}
            />
          </div>}

        </div>

        {/* 📤 Upload */}
        <div className="bg-white p-4 rounded-xl shadow">
          <UploadYaml
            setData={(newData: any) => {
              if (data && isEditMode) {
                const confirm = window.confirm(
                  "Overwrite existing data?"
                );
                if (!confirm) return;
              }
              setData(newData);
            }}
          />
        </div>

        {/* 📚 Topics */}
        {data?.topics?.map((topic: any, i: number) => (
          <TopicCard
            key={i}
            topic={topic}
            onChange={(updatedTopic: any) => {
              const newData = { ...data };
              newData.topics[i] = updatedTopic;
              setData(newData);
            }}
          />
        ))}

      </div>
    </AppLayout>
  );
};

export default QuestionBank;