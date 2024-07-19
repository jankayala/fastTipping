"use client";
import { useState, useEffect } from "react";

const ArrowsNavigation: React.FC = () => {
  const minNumber = 1;
  const maxNumber = 20;
  const blocks: number[] = Array.from({ length: maxNumber }, (_, i) => i + 1);
  const [currentNumber, setCurrentNumber] = useState<number>(10);

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

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      handlePrevious();
    } else if (event.key === "ArrowRight") {
      handleNext();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const getBackgroundColor = (index: number) => {
    return index === currentNumber ? "red" : "white";
  };

  return (
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
        >
          {block}
        </div>
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
  );
};

const styles = {
  arrow: {
    fontSize: "1rem",
    width: "3rem",
    height: "3rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  block: {
    width: "2rem",
    height: "3rem",
    border: "1px solid #ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px",
  },
  disabled: {
    cursor: "not-allowed",
    opacity: 0.5,
  },
};

export default ArrowsNavigation;
