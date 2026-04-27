import { useRef } from "react";
import QuestionCard from "./QuestionCard";

const TopicCard = ({ topic, onChange }: any) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // ➕ Add Question
  const handleAddQuestion = () => {
    const newQuestion = {
      question_text: "",
      type: "MCQ",
      options: [
        { text: "", is_correct: false },
        { text: "", is_correct: false },
      ],
      answers: [],
      pairs: [],
      hint: "",
    };

    const updated = {
      ...topic,
      questions: [...topic.questions, newQuestion],
    };

    onChange(updated);

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  // ❌ Delete Question
  const handleDeleteQuestion = (index: number) => {
    const updated = topic.questions.filter((_: any, i: number) => i !== index);
    onChange({ ...topic, questions: updated });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 space-y-4">

      {/* Topic Header */}
      <div className="flex justify-between items-center">
        <input
          className="text-lg font-semibold border-b outline-none w-full"
          value={topic.name}
          onChange={(e) =>
            onChange({ ...topic, name: e.target.value })
          }
        />

        <button
          onClick={handleAddQuestion}
          className="ml-4 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          + Question
        </button>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {topic.questions.map((q: any, i: number) => (
          <div key={i} className="border rounded-xl p-3 bg-gray-50">

            {/* 🔥 HEADER (NO OVERLAP NOW) */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() => handleDeleteQuestion(i)}
                className="text-gray-400 hover:text-red-500 text-sm"
              >
                Delete
              </button>
            </div>

            <QuestionCard
              question={q}
              onChange={(updatedQ: any) => {
                const newTopic = { ...topic };
                newTopic.questions[i] = updatedQ;
                onChange(newTopic);
              }}
            />

          </div>
        ))}
      </div>

      <div ref={bottomRef}></div>

    </div>
  );
};

export default TopicCard;