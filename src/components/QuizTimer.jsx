import { useEffect, useState } from "react";

export default function QuizTimer({ timeout, ontimeout }) {
  const [timeRemaining, setTimeRemaining] = useState(timeout);
  useEffect(() => {
    const timeOutId = setTimeout(ontimeout, timeout);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [timeout, ontimeout]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 100);
    }, 100);
    return () => {
      clearInterval(timerId);
    };
  }, []);
  return <progress id="question-time" max={timeout} value={timeRemaining} />;
}
