'use client';
import { useState, useEffect } from 'react';

interface DroppingBlock {
  id: number;
  positionY: number;
  positionX: number;
}

const ArrowsNavigation: React.FC = () => {
  const minNumber = 1;
  const maxNumber = 20;
  const blocks: number[] = Array.from({ length: maxNumber }, (_, i) => i + 1);
  const [currentNumber, setCurrentNumber] = useState<number>(10);
  const [droppingBlocks, setDroppingBlocks] = useState<DroppingBlock[]>([]);
  const [blockId, setBlockId] = useState<number>(0);

  const handlePrevious = () => {
    setCurrentNumber((prevIndex) =>
      prevIndex === minNumber ? prevIndex : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentNumber((prevIndex) =>
      prevIndex === maxNumber ? prevIndex : prevIndex + 1
    );
  };

  const handleDrop = () => {
    setBlockId((prevId) => prevId + 1);
    setDroppingBlocks((prevBlocks) => [
      ...prevBlocks,
      { id: blockId, positionY: 0, positionX: 0 },
    ]);
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'ArrowLeft') {
      handlePrevious();
    } else if (event.key === 'ArrowRight') {
      handleNext();
    } else if (event.key === 'ArrowDown') {
      handleDrop();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDroppingBlocks((prevBlocks) =>
        prevBlocks
          .map((block) => ({
            ...block,
            positionY: block.positionY + 10,
          }))
          .filter((block) => block.positionY <= window.innerHeight)
      );
    }, 100); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, []);

  const getBackgroundColor = (index: number) => {
    return index === currentNumber ? 'red' : 'white';
  };

  return (
    <>
      <div className="droppingBlocksContainer">
        {droppingBlocks.map((block) => (
          <div
            className="dropping-block"
            key={block.id}
            style={{
              ...styles.block,
              backgroundColor: 'blue',
              transform: `translate(${block.positionX}px, ${block.positionY}px)`,
            }}
          ></div>
        ))}
      </div>
      <div className="container">
        <button
          onClick={handlePrevious}
          style={
            currentNumber === minNumber
              ? { ...styles.arrow, ...styles.disabled }
              : styles.arrow
          }
          disabled={currentNumber === minNumber}
        >
          🠈
        </button>

        {blocks.map((block) => (
          <div
            className="block"
            key={block}
            style={{
              ...styles.block,
              backgroundColor: getBackgroundColor(block),
            }}
          ></div>
        ))}
        <button
          onClick={handleNext}
          style={
            currentNumber === maxNumber
              ? { ...styles.arrow, ...styles.disabled }
              : styles.arrow
          }
          disabled={currentNumber === maxNumber}
        >
          🠊
        </button>
      </div>
    </>
  );
};

const styles = {
  arrow: {
    fontSize: '1rem',
    width: '3rem',
    height: '3rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: {
    width: '2rem',
    height: '3rem',
    border: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px',
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
};

export default ArrowsNavigation;
