import { useState } from "react";
import questions from "../../questions";
import QuizTimer from "./QuizTimer";
import quizResults from "../assets/quiz-complete.png";
export default function Quiz() {
  const [selectedAnswers, setSelectedAnswers] = useState([]); // separate state for selected answers
  const [userAnswer, setUserAnswer] = useState([]);
  const activeQuestionIndex = userAnswer.length;
  const quizComplete = activeQuestionIndex === questions.length;

  function HandleClick(selectedAnswer) {
    setSelectedAnswers((prevAnswer) => {
      return [...prevAnswer, selectedAnswer];
    });
    setUserAnswer((prevAnswer) => [...prevAnswer, selectedAnswer]);
  }

  if (quizComplete) {
    return (
      <div id="summary">
        <img src={quizResults} alt="" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }
  const shuffleAnswer = [...questions[activeQuestionIndex].answers];
  shuffleAnswer.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div className="question">
        <QuizTimer
          key={activeQuestionIndex}
          timeout={10000}
          ontimeout={() => {
            HandleClick(null);
          }}
        />
        <h2>{questions[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffleAnswer.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => HandleClick(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
