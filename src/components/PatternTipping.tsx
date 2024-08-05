'use client';
import { ReactElement, useEffect, useState } from 'react';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

enum GameState {
  READY,
  PLAYING,
  WON,
  GAME_OVER,
}

const PatternTipping = () => {
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

  const [level, setLevel] = useState<number>(1);
  const [maxPatternLength, setMaxPatternLength] = useState<number>(5);
  const [pattern, setPattern] = useState<number[]>(generatePatternArray());
  const [gameState, setGameState] = useState<GameState>(GameState.READY);
  const [patternIndex, setPatternIndex] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [bestScores, setBestScores] = useState<{
    [key: number]: { name: string; time: number }[];
  }>({});
  const [playerName, setPlayerName] = useState<string>('');

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
    if (gameState !== GameState.GAME_OVER && gameState !== GameState.WON) {
      const currentValue = pattern[patternIndex];
      const currentValueAsArrow = valueAsArrow(currentValue);
      if (key === currentValueAsArrow) {
        if (pattern.length === maxPatternLength) {
          startTimer();
          setGameState(GameState.PLAYING);
        }
        const newPattern = [...pattern];
        newPattern.shift();
        setPattern(newPattern);
        setPatternIndex(0);
      } else {
        if (pattern.length !== maxPatternLength) {
          gameOver();
        }
      }
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
    setGameState(GameState.READY);
  };

  const updateBestScores = () => {
    const newScore = { name: playerName || 'Anonymous', time: elapsedTime };

    // Create a copy of the best scores for the current pattern length
    const currentScores = bestScores[maxPatternLength] || [];

    // Add the new score and sort the array by time in ascending order
    const updatedScores = [...currentScores, newScore]
      .sort((a, b) => a.time - b.time)
      .slice(0, 3); // Keep only the top 3 scores

    // Update the best scores object with the new scores for the current pattern length
    const newBestScores = {
      ...bestScores,
      [maxPatternLength]: updatedScores,
    };

    // Set the new best scores in state and localStorage
    setBestScores(newBestScores);
    localStorage.setItem('bestScores', JSON.stringify(newBestScores));
  };

  useEffect(() => {
    if (pattern.length === 0) {
      stopTimer();
      setGameState(GameState.WON);
      updateBestScores();
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
  }, [elapsedTime, timerRunning]);

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

  const gameOver = () => {
    stopTimer();
    setGameState(GameState.GAME_OVER);
  };

  const renderGameStateMessage = (gameState: GameState) => {
    switch (gameState) {
      case GameState.GAME_OVER:
        return <h1>Game Over</h1>;
      case GameState.WON:
        return <h1>You Won!</h1>;
      default:
        return null;
    }
  };

  const handlePatternLengthChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMaxPatternLength(Number(e.target.value));
    setGameState(GameState.READY);
    e.target.blur();
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(Number(e.target.value));
    setGameState(GameState.READY);
    e.target.blur();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    const savedBestScores = localStorage.getItem('bestScores');
    if (savedBestScores) {
      setBestScores(JSON.parse(savedBestScores));
    }
  }, []);

  // useEffect to generate the pattern array when the component mounts
  useEffect(() => {
    setPattern(generatePatternArray());
  }, [maxPatternLength]);

  function renderCurrentBestScores(): import('react').ReactNode {
    const currentScores = bestScores[maxPatternLength] || [];
    return currentScores.length > 0 ? (
      <ol>
        {currentScores.map((score, index) => (
          <li key={index}>
            {formatTime(score.time)}: {score.name}
          </li>
        ))}
      </ol>
    ) : (
      <p>No scores yet</p>
    );
  }

  return (
    <div className="container">
      <h1>PatternTipping</h1>
      <div>
        <h2>Controls</h2>
        <select
          name="level"
          id="level"
          value={level}
          onChange={handleLevelChange}
        >
          <option value={1}>Level 1</option>
          <option value={2}>Level 2</option>
          <option value={3}>Level 3</option>
        </select>
        <select
          name="patternLength"
          id="patternLength"
          value={maxPatternLength}
          onChange={handlePatternLengthChange}
        >
          <option value={5}>5</option>
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
      {renderGameStateMessage(gameState)}
      <h2>
        Score {maxPatternLength - pattern.length} of {maxPatternLength}
      </h2>
      {pattern[0] && valueAsIcon(pattern[0])}
      {pattern[1] && valueAsIcon(pattern[1])}
      {pattern[2] && valueAsIcon(pattern[2])}
      {pattern.length > 3 && <MoreVertIcon />}
      {/* {pattern.map((value, index) => (
        <div key={index}>{valueAsIcon(value)}</div>
      ))} */}
      <div>
        <p>Level: {level}</p>
        <p>Pattern Length: {maxPatternLength}</p>
        <p>Game state: {GameState[gameState]}</p>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <h2>Best Scores</h2>
          {renderCurrentBestScores()}
        </div>
      </div>
    </div>
  );
};

export default PatternTipping;
