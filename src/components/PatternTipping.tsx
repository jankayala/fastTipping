'use client';
import { ReactElement, useEffect, useState } from 'react';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const PatternTipping = () => {
  const [level, setLevel] = useState<number>(1);
  const [maxPatternLength, setMaxPatternLength] = useState<number>(20);
  const [pattern, setPattern] = useState<number[]>([]);
  const [patternIndex, setPatternIndex] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  // Function to generate a random number between min and max (inclusive)
  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generatePatternArray = (): number[] => {
    const patternArray = [];
    for (let i = 0; i < maxPatternLength; i++) {
      patternArray.push(getRandomNumber(1, 4));
    }
    return patternArray;
  };

  const valueAsArrow = (value: number): string => {
    switch (value) {
      case 1:
        return 'ArrowLeft';
      case 2:
        return 'ArrowRight';
      case 3:
        return 'ArrowDown';
      case 4:
        return 'ArrowUp';
      default:
        return '';
    }
  };

  const valueAsIcon = (value: number): ReactElement<any, any> => {
    switch (value) {
      case 1:
        return <ArrowBackOutlinedIcon fontSize="large" />;
      case 2:
        return <ArrowForwardOutlinedIcon fontSize="large" />;
      case 3:
        return <ArrowDownwardOutlinedIcon fontSize="large" />;
      case 4:
        return <ArrowUpwardOutlinedIcon fontSize="large" />;
      default:
        return <ErrorOutlineOutlinedIcon fontSize="large" />;
    }
  };

  const handleArrowDown = (key: string) => {
    const currentValue = pattern[patternIndex];
    const currentValueAsArrow = valueAsArrow(currentValue);
    if (key === currentValueAsArrow) {
      if (pattern.length === maxPatternLength) {
        startTimer();
      }
      const newPattern = [...pattern];
      newPattern.shift();
      setPattern(newPattern);
      setPatternIndex(0);
    }
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowDown':
      case 'ArrowUp':
        handleArrowDown(event.key);
        console.log(event.key);
        break;
      case ' ':
        reset();
        console.log(event.code);
      default:
        break;
    }
  };

  const reset = () => {
    setPattern(generatePatternArray());
    setElapsedTime(0);
    stopTimer();
  };

  useEffect(() => {
    if (pattern.length === 0) {
      stopTimer();
    }
  }, [pattern]);

  // useEffect to handle the timer
  useEffect(() => {
    let startTime: number;
    let timer: NodeJS.Timeout;

    if (timerRunning) {
      startTime = Date.now() - elapsedTime;
      timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timerRunning]);

  // Format elapsed time to show milliseconds
  const formatTime = (time: number) => {
    const milliseconds = Math.floor(time % 1000);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}:${
      milliseconds < 100
        ? milliseconds < 10
          ? `00${milliseconds}`
          : `0${milliseconds}`
        : milliseconds
    }`;
  };

  const startTimer = () => {
    setElapsedTime(0);
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  // useEffect to generate the pattern array when the component mounts
  useEffect(() => {
    setPattern(generatePatternArray());
  }, []);

  return (
    <div className="container">
      <h1>PatternTipping</h1>
      <div>
        <h2>Controls</h2>
        <select
          name="level"
          id="level"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
        >
          <option value={1}>Level 1</option>
          <option value={2}>Level 2</option>
          <option value={3}>Level 3</option>
        </select>
        <select
          name="patternLength"
          id="patternLength"
          value={maxPatternLength}
          onChange={(e) => setMaxPatternLength(Number(e.target.value))}
        >
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <button onClick={reset}>Reset Pattern</button>
      </div>
      <div>
        <h2>Timer</h2>
        <p>{formatTime(elapsedTime)} seconds</p>
      </div>
      <h2>Pattern</h2>
      {pattern.map((value, index) => (
        <div key={index}>{valueAsIcon(value)}</div>
      ))}
    </div>
  );
};

export default PatternTipping;
