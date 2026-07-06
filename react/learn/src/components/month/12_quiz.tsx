import React, { useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  {
    question: "Which hook is used for state?",
    options: ["useState", "useEffect", "useMemo", "useRef"],
    answer: "useState",
  },
  {
    question: "React is mainly used for?",
    options: ["Database", "Frontend", "Backend", "Operating System"],
    answer: "Frontend",
  },
  {
    question: "Which company created React?",
    options: ["Google", "Microsoft", "Meta", "Amazon"],
    answer: "Meta",
  },
  {
    question: "JSX stands for?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JSON XML",
      "Java Source XML",
    ],
    answer: "JavaScript XML",
  },
  {
    question: "Which hook runs side effects?",
    options: ["useState", "useEffect", "useReducer", "useMemo"],
    answer: "useEffect",
  },
];

export default function Quiz() {
  const [currentIndes, setCurrentIndes] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(-1);

  if (currentIndes >= questions.length) {
    return (
      <div>
        <div>
          Quiz Finished! Your score: {score}/{questions.length}
        </div>
        <button onClick={() => setCurrentIndes((prev) => (prev = 0))}>
          Restart
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndes];

  const nextQuestion = () => {
    if (answerIndex === -1) {
      alert("Please select an option first!");
      return;
    }

    if (currentQuestion.answer === currentQuestion.options[answerIndex]) {
      setScore((prev) => prev + 1);
    }

    if (!currentQuestion) {
      return <div>Quiz Finished! Your score: {score}</div>;
    }

    setAnswerIndex(-1);

    setCurrentIndes((prev) => prev + 1);
  };

  console.log(score);

  return (
    <div>
      <h3>Que:{currentQuestion.question}</h3>
      <ul>
        {currentQuestion.options.map((op, i) => (
          <li key={i}>
            <button
              style={{ cursor: "pointer", marginBottom: 5 }}
              onClick={() => setAnswerIndex(i)}
            >
              {op}{" "}
            </button>{" "}
          </li>
        ))}
      </ul>
      <p>
        Question : {currentIndes + 1}/ {questions.length}
      </p>
      <button
        onClick={nextQuestion}
        // disabled={currentIndes === questions.length - 1}
      >
        Next
      </button>
    </div>
  );
}
