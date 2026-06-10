"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizOptionCard from "@/components/student/QuizOptionCard";
import QuizProgressBar from "@/components/student/QuizProgressBar";

// Mock quiz data
const quizData = {
  title: "Advanced Database Systems",
  questions: [
    {
      id: 1,
      question: "Which of the following best describes a correlated subquery?",
      chartHint: true,
      options: [
        { id: 1, text: "A subquery that executes independently of the outer query" },
        { id: 2, text: "A subquery that references columns from the outer query" },
        { id: 3, text: "A subquery that returns exactly one row" },
        { id: 4, text: "A subquery used only in the FROM clause" },
      ],
      correctId: 2,
    },
    {
      id: 2,
      question: "What does ACID stand for in database transactions?",
      chartHint: false,
      options: [
        { id: 1, text: "Atomicity, Consistency, Isolation, Durability" },
        { id: 2, text: "Automated, Consistent, Isolated, Durable" },
        { id: 3, text: "Atomic, Concurrent, Isolated, Distributed" },
        { id: 4, text: "Accurate, Consistent, Indexed, Durable" },
      ],
      correctId: 1,
    },
    {
      id: 3,
      question: "Which normalization form eliminates transitive dependencies?",
      chartHint: false,
      options: [
        { id: 1, text: "First Normal Form (1NF)" },
        { id: 2, text: "Second Normal Form (2NF)" },
        { id: 3, text: "Third Normal Form (3NF)" },
        { id: 4, text: "Boyce-Codd Normal Form (BCNF)" },
      ],
      correctId: 3,
    },
  ],
};

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const currentQuestion = quizData.questions[currentIndex];
  const isLast = currentIndex === quizData.questions.length - 1;
  const isFirst = currentIndex === 0;

  const handleOptionClick = (optionId: number) => {
    if (revealed) return;
    setSelectedOption(optionId);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleNext = () => {
    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(answers[quizData.questions[currentIndex + 1].id] ?? null);
      setRevealed(false);
    }
  };

  const handlePrevious = () => {
    if (!isFirst) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(answers[quizData.questions[currentIndex - 1].id] ?? null);
      setRevealed(false);
    }
  };

  const handleCheck = () => {
    if (selectedOption) {
      setRevealed(true);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      {/* Progress */}
      <div className="border-b border-border bg-white px-4 py-3">
        <QuizProgressBar
          current={currentIndex + 1}
          total={quizData.questions.length}
        />
      </div>

      {/* Question Section */}
      <div className="flex-1 px-4 py-6">
        {/* Chart hint placeholder */}
        {currentQuestion.chartHint && (
          <div className="mb-6 flex h-48 items-center justify-center rounded-[var(--radius)] border border-border bg-[#f8f9ff]">
            <span className="text-sm text-muted-foreground">
              [Performance Trend Chart]
            </span>
          </div>
        )}

        {/* Question text */}
        <h1 className="mb-6 text-lg font-bold leading-relaxed text-foreground">
          {currentQuestion.question}
        </h1>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option) => (
            <QuizOptionCard
              key={option.id}
              id={option.id}
              text={option.text}
              isSelected={selectedOption === option.id}
              isCorrect={option.id === currentQuestion.correctId}
              isRevealed={revealed}
              onClick={handleOptionClick}
            />
          ))}
        </div>

        {/* Feedback */}
        {revealed && (
          <div className="mt-4 rounded-[var(--radius)] bg-emerald-50 p-3 text-sm text-emerald-700">
            {selectedOption === currentQuestion.correctId
              ? "Correct! Well done."
              : `Incorrect. The correct answer is option ${String.fromCharCode(64 + currentQuestion.correctId)}.`}
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="sticky bottom-16 border-t border-border bg-white px-4 py-3 md:bottom-0">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirst}
            className="gap-1"
          >
            <ChevronLeft className="size-4" />
            Previous
          </Button>

          {!revealed ? (
            <Button onClick={handleCheck} disabled={!selectedOption}>
              Check Answer
            </Button>
          ) : isLast ? (
            <Button>Finish Quiz</Button>
          ) : (
            <Button onClick={handleNext} className="gap-1">
              Next
              <ChevronRight className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
