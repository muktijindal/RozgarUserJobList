"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const JobQuestionsModal = ({
  open,
  questions = [],
  onClose,
  onSubmit, // ✅ REQUIRED: callback to parent
}) => {
  const [answers, setAnswers] = useState({});

  if (!open) return null;

  const handleChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const hasOptions = (q) =>
    Array.isArray(q.options) && q.options.length > 0;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-xl p-6 max-h-[80vh] overflow-y-auto">
        
        {/* HEADER */}
        <h2 className="text-lg font-semibold mb-4">
          Application Questions
        </h2>

        {/* QUESTIONS */}
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={index}>
              <p className="font-medium mb-2">
                {index + 1}. {q.question}
                {q.mandatory && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </p>

              {/* SINGLE CHOICE */}
              {q.type === "single_choice" && hasOptions(q) && (
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="radio"
                        name={`q-${index}`}
                        value={opt}
                        onChange={() =>
                          handleChange(index, opt)
                        }
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* MULTIPLE CHOICE */}
              {q.type === "multiple_choice" && hasOptions(q) && (
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        value={opt}
                        onChange={(e) => {
                          const prev = answers[index] || [];
                          if (e.target.checked) {
                            handleChange(index, [
                              ...prev,
                              opt,
                            ]);
                          } else {
                            handleChange(
                              index,
                              prev.filter(
                                (o) => o !== opt
                              )
                            );
                          }
                        }}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* TEXT INPUT (no options OR short_answer) */}
              {(!hasOptions(q) ||
                q.type === "short_answer") && (
                <input
                  type="text"
                  placeholder="Type your answer here..."
                  className="w-full mt-2 px-3 py-2 border rounded-md 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={answers[index] || ""}
                  onChange={(e) =>
                    handleChange(index, e.target.value)
                  }
                />
              )}
            </div>
          ))}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => onSubmit(answers)} // ✅ SEND ANSWERS UP
          >
            Submit Application
          </Button>
        </div>
      </div>
    </div>
  );
};
