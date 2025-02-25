import React, { useState, useEffect, useRef } from 'react';
import './TypingTest.css';

const sampleText = "The quick brown fox jumps over the lazy dog.";

const TypingTest = () => {
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const intervalRef = useRef(null);

  const handleChange = (e) => {
    if (!isRunning) setIsRunning(true);
    const value = e.target.value;
    setInput(value);
    updateAccuracy(value);
  };

  
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(intervalRef.current);
      
      const wordsTyped = input.trim().split(' ').filter(word => word !== '').length;
      setWpm(wordsTyped);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, input]);

  const updateAccuracy = (value) => {
    let errors = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== sampleText[i]) {
        errors++;
      }
    }
    const correct = value.length - errors;
    const percent = value.length ? Math.max(0, Math.floor((correct / value.length) * 100)) : 100;
    setAccuracy(percent);
  };

  const handleRestart = () => {
    clearInterval(intervalRef.current);
    setInput('');
    setTimeLeft(60);
    setIsRunning(false);
    setWpm(0);
    setAccuracy(100);
  };

  return (
    <div className="container">
      <h1>Typing Test</h1>
      <p className="sample-text">{sampleText}</p>
      <textarea
        className="input-area"
        value={input}
        onChange={handleChange}
        placeholder="Start typing here..."
        disabled={timeLeft === 0}
      />
      <div className="stats">
        <p>Time Left: {timeLeft} sec</p>
        <p>WPM: {wpm}</p>
        <p>Accuracy: {accuracy}%</p>
      </div>
      <button className="restart-btn" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
};

export default TypingTest;
