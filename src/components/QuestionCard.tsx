import React from "react";

const QuestionCard = ({ question, onChange }: any) => {
  const updateOption = (index: number, key: string, value: any) => {
    const newOptions = [...(question.options || [])];
    newOptions[index][key] = value;
    onChange({ ...question, options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = question.options.filter((_: any, i: number) => i !== index);
    onChange({ ...question, options: newOptions });
  };

  const handleTypeChange = (newType: string) => {

    let updated: any = {
      ...question,
      type: newType,
      options: [],
      answers: [],
      pairs: [],
    };

    if (newType === "MCQ" || newType === "MULTI_SELECT") {
      updated.options = [
        { text: "", is_correct: false },
        { text: "", is_correct: false },
      ];
    }

    if (newType === "FIB") {
      updated.answers = [""];
    }

    if (newType === "DRAG_DROP") {
      updated.options = [{ text: "", match: "" }];
    }

    if (newType === "IMAGE") {
      updated.options = [
        { image: "", file: null, is_correct: false },
        { image: "", file: null, is_correct: false },
      ];
    }



    if (newType === "MATCH") {
      updated.pairs = [{ left: "", right: "" }];
    }

    onChange(updated);
  };

  return (
    <div className="border rounded-xl bg-gray-50 p-5 space-y-4">

      {/* Question Input */}
      <input
        className="w-full border px-3 py-2 rounded-md text-sm"
        placeholder="Enter question..."
        value={question.question_text}
        onChange={(e) =>
          onChange({ ...question, question_text: e.target.value })
        }
      />

      {/* Type */}
      <select
        className="border px-3 py-2 rounded-md text-sm w-40"
        value={question.type}
        onChange={(e) => handleTypeChange(e.target.value)}
      >
        <option value="MCQ">MCQ</option>
        <option value="MULTI_SELECT">MULTI_SELECT</option>
        <option value="FIB">FIB</option>
        <option value="DRAG_DROP">DRAG_DROP</option>
        <option value="IMAGE">IMAGE</option>
        <option value="MATCH">MATCH</option>
      </select>

      {/* ================= MCQ ================= */}
      {question.type === "MCQ" && (
        <>
          {question.options?.map((opt: any, i: number) => (
            <div key={i} className="flex items-center gap-3">

              <input
                className="flex-1 border px-2 py-1 rounded"
                value={opt.text}
                onChange={(e) => updateOption(i, "text", e.target.value)}
              />

              <input
                type="radio"
                name={`mcq-${question.question_text}`}
                checked={opt.is_correct}
                onChange={() => {
                  const newOptions = question.options.map((o: any, idx: number) => ({
                    ...o,
                    is_correct: idx === i,
                  }));
                  onChange({ ...question, options: newOptions });
                }}
              />

              <button
                onClick={() => removeOption(i)}
                className="text-gray-400 hover:text-red-500"
              >
                ✕
              </button>

            </div>
          ))}

          <button
            onClick={() =>
              onChange({
                ...question,
                options: [...question.options, { text: "", is_correct: false }],
              })
            }
            className="text-blue-600 text-sm"
          >
            + Add Option
          </button>
        </>
      )}

      {/* ================= MULTI ================= */}
      {question.type === "MULTI_SELECT" && (
        <>
          {question.options?.map((opt: any, i: number) => (
            <div key={i} className="flex items-center gap-3">

              <input
                className="flex-1 border px-2 py-1 rounded"
                value={opt.text}
                onChange={(e) => updateOption(i, "text", e.target.value)}
              />

              <input
                type="checkbox"
                checked={opt.is_correct}
                onChange={(e) =>
                  updateOption(i, "is_correct", e.target.checked)
                }
              />

              <button
                onClick={() => removeOption(i)}
                className="text-gray-400 hover:text-red-500"
              >
                ✕
              </button>

            </div>
          ))}

          <button
            onClick={() =>
              onChange({
                ...question,
                options: [...question.options, { text: "", is_correct: false }],
              })
            }
            className="text-blue-600 text-sm"
          >
            + Add Option
          </button>
        </>
      )}

      {/* ================= FIB ================= */}
      {question.type === "FIB" && (
        <>
          {question.answers?.map((ans: string, i: number) => (
            <div key={i} className="flex gap-3">
              <input
                className="flex-1 border px-2 py-1 rounded"
                value={ans}
                onChange={(e) => {
                  const newAns = [...question.answers];
                  newAns[i] = e.target.value;
                  onChange({ ...question, answers: newAns });
                }}
              />

              <button
                onClick={() => {
                  const newAns = question.answers.filter((_: any, idx: number) => idx !== i);
                  onChange({ ...question, answers: newAns });
                }}
                className="text-gray-400 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            onClick={() =>
              onChange({
                ...question,
                answers: [...question.answers, ""],
              })
            }
            className="text-blue-600 text-sm"
          >
            + Add Answer
          </button>
        </>
      )}

      {/* ================= MATCH ================= */}
      {question.type === "MATCH" && (
        <>
          {question.pairs?.map((pair: any, i: number) => (
            <div key={i} className="flex gap-3">

              <input
                className="flex-1 border px-2 py-1 rounded"
                placeholder="Left"
                value={pair.left}
                onChange={(e) => {
                  const newPairs = [...question.pairs];
                  newPairs[i].left = e.target.value;
                  onChange({ ...question, pairs: newPairs });
                }}
              />

              <input
                className="flex-1 border px-2 py-1 rounded"
                placeholder="Right"
                value={pair.right}
                onChange={(e) => {
                  const newPairs = [...question.pairs];
                  newPairs[i].right = e.target.value;
                  onChange({ ...question, pairs: newPairs });
                }}
              />

              <button
                onClick={() => {
                  const newPairs = question.pairs.filter((_: any, idx: number) => idx !== i);
                  onChange({ ...question, pairs: newPairs });
                }}
                className="text-gray-400 hover:text-red-500"
              >
                ✕
              </button>

            </div>
          ))}

          <button
            onClick={() =>
              onChange({
                ...question,
                pairs: [...question.pairs, { left: "", right: "" }],
              })
            }
            className="text-blue-600 text-sm"
          >
            + Add Pair
          </button>
        </>
      )}
      {/* // IMage Type */}
      {question.type === "IMAGE" && (
        <div style={{ marginTop: 12 }}>
          <p style={{ fontWeight: 600 }}>Image Options</p>

          {(question.options || []).map((opt: any, index: number) => (
            <div key={index} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>

              {/* SHOW IMAGE (URL or local) OR FILE INPUT */}
              {(opt.file || opt.preview || opt.image?.startsWith("http")) ? (
                <>
                  <img
                    // src={opt.file ? URL.createObjectURL(opt.file) : opt.preview || opt.image}
                    src={
                      opt.file instanceof File
                        ? URL.createObjectURL(opt.file)
                        : opt.image
                    }
                    width={60}
                    style={{ border: "1px solid #ccc", borderRadius: 6 }}
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e: any) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const updated = [...(question.options || [])];
                      updated[index] = { ...updated[index], file, image: file.name, preview: "" };

                      const newOptions = updated.map((o) => ({
                        image: o.file?.name || o.preview || o.image,
                        file: o.file,               // 🔥 MUST
                        is_correct: o.is_correct,
                      }));

                      // 🔥 पहले parent update
                      onChange({
                        ...question,
                        options: newOptions,
                      });

                      // 🔥 फिर local state
                    }}
                  />
                </>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e: any) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const updated = [...(question.options || [])];
                    updated[index] = { ...updated[index], file, image: file.name };

                    onChange({
                      ...question,
                      options: updated.map((o) => ({
                        image: o.file?.name || o.preview || o.image,
                        file: o.file,
                        is_correct: o.is_correct,
                      })),
                    });
                  }}
                />
              )}

              {/* CORRECT SELECT */}
              <input
                type="radio"
                checked={opt.is_correct}
                onChange={() => {
                  const updated = (question.options || []).map((o: any, i: number) => ({
                    ...o,
                    is_correct: i === index,
                  }));

                  onChange({
                    ...question,
                    options: updated.map((o: any) => ({
                      image: o.file?.name || o.preview || o.image,
                      file: o.file,
                      is_correct: o.is_correct,
                    })),
                  });
                }}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              onChange({
                ...question,
                options: [
                  ...(question.options || []),
                  { image: "", file: null, preview: "", is_correct: false },
                ],
              })
            }
            style={{ color: "blue", fontSize: 12 }}
          >
            + Add Image
          </button>
        </div>
      )}

      {question.type === "DRAG_DROP" && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Drag & Drop (Grouping)</h4>

          {/* ===== GROUPS (EXACTLY 2) ===== */}
          <div className="flex gap-3 mb-3">
            {(question.groups || []).map((g: string, i: number) => (
              <input
                key={i}
                value={g}
                placeholder={`Group ${i + 1}`}
                className="border p-2 rounded w-full"
                onChange={(e) => {
                  const updated = [...question.groups];
                  updated[i] = e.target.value;
                  onChange({ ...question, groups: updated });
                }}
              />
            ))}
          </div>

          {/* Add Group (max 2) */}
          <button
            type="button"
            disabled={(question.groups || []).length >= 2}
            onClick={() =>
              onChange({
                ...question,
                groups: [...(question.groups || []), ""],
              })
            }
            className="text-blue-600 text-sm mb-4"
          >
            + Add Group (Max 2)
          </button>

          {/* ===== ITEMS ===== */}
          <div className="space-y-2">
            {(question.items || []).map((item: any, index: number) => (
              <div key={index} className="flex gap-2 items-center">

                {/* TEXT */}
                <input
                  value={item.text}
                  placeholder="Enter item"
                  className="border p-2 flex-1 rounded"
                  onChange={(e) => {
                    const updated = [...question.items];
                    updated[index].text = e.target.value;
                    onChange({ ...question, items: updated });
                  }}
                />

                {/* GROUP SELECT (ANSWER) */}
                <select
                  value={item.group}
                  className="border p-2 rounded"
                  onChange={(e) => {
                    const updated = [...question.items];
                    updated[index].group = e.target.value;
                    onChange({ ...question, items: updated });
                  }}
                >
                  {(question.groups || []).map((g: string, i: number) => (
                    <option key={i} value={g}>
                      {g}
                    </option>
                  ))}
                </select>

                {/* DELETE */}
                <button
                  type="button"
                  onClick={() => {
                    const updated = question.items.filter(
                      (_: any, i: number) => i !== index
                    );
                    onChange({ ...question, items: updated });
                  }}
                  className="text-red-500 text-sm"
                >
                  ✕
                </button>

              </div>
            ))}
          </div>

          {/* ADD ITEM */}
          <button
            type="button"
            onClick={() =>
              onChange({
                ...question,
                items: [
                  ...(question.items || []),
                  {
                    text: "",
                    group: question.groups?.[0] || "",
                  },
                ],
              })
            }
            className="text-blue-600 text-sm mt-3"
          >
            + Add Item
          </button>

        </div>
      )}


      {/* Hint */}
      <input
        className="border px-3 py-2 rounded-md text-sm w-full"
        placeholder="Hint..."
        value={question.hint || ""}
        onChange={(e) =>
          onChange({ ...question, hint: e.target.value })
        }
      />

    </div>
  );
};

export default QuestionCard;
