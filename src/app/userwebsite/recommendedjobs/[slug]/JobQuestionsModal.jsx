"use client";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";

export const JobQuestionsModal = ({ open, questions, onClose, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [hasApplied, setHasApplied] = useState(false);

  const handleFinalApply = async () => {
    try {
      setApplying(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://147.93.72.227:5000/api/jobs/applications/${job.category}/${job.job_id}/apply`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: answersPayload,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Apply failed");
      }

      console.log("Apply Success:", data);

      setHasApplied(true); // ✅ MARK AS APPLIED
      setShowConfirmModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Apply failed:", error);
      alert(error.message || "Failed to apply. Please try again.");
    } finally {
      setApplying(false);
    }
  };

  // ============================
  // 🔹 NORMALIZE QUESTIONS (HOOK SAFE)
  // ============================
  const normalizedQuestions = useMemo(() => {
    if (!questions) return [];

    if (Array.isArray(questions)) return questions;

    if (typeof questions === "string") {
      try {
        const parsed = JSON.parse(questions);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error("❌ Failed to parse questions:", e);
      }
    }

    return [];
  }, [questions]);

  // ============================
  // 🔹 HELPERS
  // ============================
  const handleChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const getOptions = (q) => {
    if (!q?.options) return [];

    if (Array.isArray(q.options)) return q.options;

    if (typeof q.options === "string") {
      try {
        const parsed = JSON.parse(q.options);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return [];
      }
    }

    return [];
  };

  // ❗ IMPORTANT: return AFTER hooks
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-xl p-6 max-h-[80vh] overflow-y-auto">
        {/* HEADER */}
        <h2 className="text-lg font-semibold mb-4">Application Questions</h2>

        {/* QUESTIONS */}
        <div className="space-y-6">
          {normalizedQuestions.length === 0 && (
            <p className="text-gray-500 text-sm">
              No questions available for this job.
            </p>
          )}

          {normalizedQuestions.map((q, index) => {
            const options = getOptions(q);

            return (
              <div key={index}>
                <p className="font-medium mb-2">
                  {index + 1}. {q.question || "Untitled question"}
                  {q.mandatory && <span className="text-red-500 ml-1">*</span>}
                </p>

                {/* SINGLE CHOICE */}
                {q.type === "single_choice" && options.length > 0 && (
                  <div className="space-y-2">
                    {options.map((opt, i) => (
                      <label key={i} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`q-${index}`}
                          value={opt}
                          checked={answers[index] === opt}
                          onChange={() => handleChange(index, opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* MULTIPLE CHOICE */}
                {q.type === "multiple_choice" && options.length > 0 && (
                  <div className="space-y-2">
                    {options.map((opt, i) => (
                      <label key={i} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={opt}
                          checked={
                            Array.isArray(answers[index]) &&
                            answers[index].includes(opt)
                          }
                          onChange={(e) => {
                            const prev = answers[index] || [];
                            if (e.target.checked) {
                              handleChange(index, [...prev, opt]);
                            } else {
                              handleChange(
                                index,
                                prev.filter((o) => o !== opt)
                              );
                            }
                          }}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* TEXT INPUT */}
                {(options.length === 0 || q.type === "short_answer") && (
                  <input
                    type="text"
                    placeholder="Type your answer here..."
                    className="w-full mt-2 px-3 py-2 border rounded-md 
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={answers[index] || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSubmit(answers)}>Submit Application</Button>
        </div>
      </div>
    </div>
  );
};
