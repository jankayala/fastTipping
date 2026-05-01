'use client';
import { ReactElement, useEffect, useState, useCallback } from 'react';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import RefreshIcon from '@mui/icons-material/Refresh';

enum GameState {
  READY,
  PLAYING,
  WON,
  GAME_OVER,
}

const PatternTipping = () => {
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
  const [keyState, setKeyState] = useState<'success' | 'error' | null>(null);

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
        return <ArrowBackOutlinedIcon />;
      case 2:
        return <ArrowForwardOutlinedIcon />;
      case 3:
        return <ArrowDownwardOutlinedIcon />;
      case 4:
        return <ArrowUpwardOutlinedIcon />;
      default:
        return <ErrorOutlineOutlinedIcon />;
    }
  };

  const handleArrowDown = useCallback(
    (key: string) => {
      if (gameState !== GameState.GAME_OVER && gameState !== GameState.WON) {
        const currentValue = pattern[patternIndex];
        const currentValueAsArrow = valueAsArrow(currentValue);

        if (key === currentValueAsArrow) {
          setKeyState('success');
          setTimeout(() => setKeyState(null), 200);

          if (pattern.length === maxPatternLength) {
            startTimer();
            setGameState(GameState.PLAYING);
          }
          const newPattern = [...pattern];
          newPattern.shift();
          setPattern(newPattern);
          setPatternIndex(0);
        } else {
          setKeyState('error');
          setTimeout(() => setKeyState(null), 300);

          if (pattern.length !== maxPatternLength) {
            gameOver();
          }
        }
      }
    },
    [gameState, pattern, patternIndex, maxPatternLength]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'ArrowDown':
        case 'ArrowUp':
          handleArrowDown(event.key);
          break;
        case ' ':
          event.preventDefault();
          reset();
          break;
        default:
          break;
      }
    },
    [handleArrowDown]
  );

  const reset = () => {
    setPattern(generatePatternArray());
    setElapsedTime(0);
    stopTimer();
    setGameState(GameState.READY);
    setKeyState(null);
  };

  const updateBestScores = () => {
    const newScore = { name: playerName || 'Anonymous', time: elapsedTime };
    const currentScores = bestScores[maxPatternLength] || [];
    const updatedScores = [...currentScores, newScore]
      .sort((a, b) => a.time - b.time)
      .slice(0, 3);
    const newBestScores = {
      ...bestScores,
      [maxPatternLength]: updatedScores,
    };
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

  const handlePatternLengthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
  }, [handleKeyDown]);

  useEffect(() => {
    const savedBestScores = localStorage.getItem('bestScores');
    if (savedBestScores) {
      setBestScores(JSON.parse(savedBestScores));
    }
  }, []);

  useEffect(() => {
    setPattern(generatePatternArray());
  }, [maxPatternLength]);

  const progress = ((maxPatternLength - pattern.length) / maxPatternLength) * 100;

  const getStatusType = () => {
    switch (gameState) {
      case GameState.GAME_OVER:
        return 'error';
      case GameState.WON:
        return 'success';
      case GameState.PLAYING:
        return 'info';
      default:
        return 'info';
    }
  };

  const getStatusMessage = () => {
    switch (gameState) {
      case GameState.GAME_OVER:
        return 'Game Over! Press Space to retry';
      case GameState.WON:
        return 'You Won! Press Space to play again';
      case GameState.PLAYING:
        return 'Match the pattern!';
      default:
        return 'Press arrow keys to start';
    }
  };

  const renderCurrentBestScores = () => {
    const currentScores = bestScores[maxPatternLength] || [];
    return currentScores.length > 0 ? (
      <ol className="leaderboard-list">
        {currentScores.map((score, index) => (
          <li key={index} className="leaderboard-item">
            <span className="leaderboard-rank">{index + 1}</span>
            <span className="leaderboard-name">{score.name}</span>
            <span className="leaderboard-time">{formatTime(score.time)}</span>
          </li>
        ))}
      </ol>
    ) : (
      <div className="leaderboard-empty">
        <TrophyIcon style={{ fontSize: 24, opacity: 0.3, marginBottom: 4 }} />
        <p>No scores yet. Be the first!</p>
      </div>
    );
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h1 className="game-title">Pattern Tipping</h1>
        <p className="game-subtitle">Memorize the pattern. Match it with arrow keys. Beat the clock.</p>
      </div>

      <div className={`status-message ${getStatusType()}`}>{getStatusMessage()}</div>

      <div className="game-main">
        <div className="game-left-panel">
          <div className="game-card">
            <div className="timer-display">
              <div className={`timer-value${timerRunning ? ' running' : ''}`}>{formatTime(elapsedTime)}</div>
              <div className="timer-label">Elapsed Time</div>
            </div>
          </div>

          <div className="game-card compact">
            <div className="score-display">
              <span className="score-text">
                {maxPatternLength - pattern.length} / {maxPatternLength}
              </span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          <div className="game-card fill">
            <h2 className="card-title">Current Pattern</h2>
            <div className="pattern-display">
              {pattern.length === 0 && gameState === GameState.WON ? (
                <TrophyIcon style={{ fontSize: 48, color: '#10b981' }} />
              ) : (
                <>
                  {pattern[0] && (
                    <div className={`arrow-icon active${keyState === 'success' ? ' success' : ''}${keyState === 'error' ? ' error' : ''}`}>
                      {valueAsIcon(pattern[0])}
                    </div>
                  )}
                  {pattern[1] && (
                    <div className="arrow-icon">{valueAsIcon(pattern[1])}</div>
                  )}
                  {pattern[2] && (
                    <div className="arrow-icon">{valueAsIcon(pattern[2])}</div>
                  )}
                  {pattern.length > 3 && (
                    <div className="arrow-icon">
                      <MoreVertIcon />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="game-right-panel">
          <div className="game-card">
            <h2 className="card-title">Settings</h2>
            <div className="controls-grid">
              <div className="control-group">
                <label className="control-label">Level</label>
                <select className="game-select" value={level} onChange={handleLevelChange}>
                  <option value={1}>Level 1</option>
                  <option value={2}>Level 2</option>
                  <option value={3}>Level 3</option>
                </select>
              </div>
              <div className="control-group">
                <label className="control-label">Length</label>
                <select className="game-select" value={maxPatternLength} onChange={handlePatternLengthChange}>
                  <option value={5}>5</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <button className="game-btn primary" onClick={reset}>
                <RefreshIcon style={{ fontSize: 16 }} /> Reset
              </button>
            </div>
          </div>

          <div className="game-card">
            <h2 className="card-title">Player</h2>
            <div className="control-group">
              <input
                className="game-input"
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div className="game-card fill">
            <h2 className="card-title">
              <TrophyIcon style={{ verticalAlign: 'middle', marginRight: 6, fontSize: 16 }} />
              Leaderboard
            </h2>
            {renderCurrentBestScores()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternTipping;
