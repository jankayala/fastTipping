'use client';
import { useState, useEffect, useCallback } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface DroppingBlock {
  id: number;
  positionY: number;
  columnIndex: number;
}

export default function ArrowsNavigation() {
  const minNumber = 1;
  const maxNumber = 20;
  const blocks: number[] = Array.from({ length: maxNumber }, (_, i) => i + 1);
  const [currentNumber, setCurrentNumber] = useState<number>(10);
  const [droppingBlocks, setDroppingBlocks] = useState<DroppingBlock[]>([]);
  const [blockId, setBlockId] = useState<number>(0);

  const handlePrevious = () => {
    setCurrentNumber((prevIndex) => (prevIndex === minNumber ? prevIndex : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentNumber((prevIndex) => (prevIndex === maxNumber ? prevIndex : prevIndex + 1));
  };

  const handleDrop = () => {
    const columnIndex = currentNumber - 1;

    setBlockId((prevId) => prevId + 1);
    setDroppingBlocks((prevBlocks) => [
      ...prevBlocks,
      { id: blockId, positionY: 0, columnIndex },
    ]);
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'ArrowLeft') {
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        handleDrop();
      }
    },
    [handlePrevious, handleNext, handleDrop, blockId, currentNumber]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDroppingBlocks((prevBlocks) =>
        prevBlocks
          .map((block) => ({
            ...block,
            positionY: block.positionY + 10,
          }))
          .filter((block) => block.positionY <= 250)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="arrows-nav-container">
      <div className="current-indicator">
        <div className="current-indicator-label">Current</div>
        <div className="current-indicator-value">{currentNumber}</div>
      </div>

      <div className="arrows-nav-buttons">
        <button
          className="nav-btn"
          disabled={currentNumber === minNumber}
          onClick={handlePrevious}
        >
          <ArrowBackIcon />
        </button>

        <button className="drop-btn" onClick={handleDrop}>
          <ArrowDownwardIcon style={{ fontSize: 18 }} /> Drop Block
        </button>

        <button
          className="nav-btn"
          disabled={currentNumber === maxNumber}
          onClick={handleNext}
        >
          <ArrowForwardIcon />
        </button>
      </div>

      <div className="blocks-row">
        {blocks.map((block) => (
          <div
            key={block}
            className={`block-item${block === currentNumber ? ' active' : ''}`}
          >
            {block}
          </div>
        ))}
      </div>

      <div className="dropping-area">
        {blocks.map((blockIndex) => {
          const columnIndex = blockIndex - 1;
          const blocksInColumn = droppingBlocks.filter(
            (db) => db.columnIndex === columnIndex
          );

          return (
            <div key={blockIndex} className="dropping-column">
              {blocksInColumn.map((db) => (
                <div
                  key={db.id}
                  className="dropping-block"
                  style={{ transform: `translate(-50%, ${db.positionY}px)` }}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
