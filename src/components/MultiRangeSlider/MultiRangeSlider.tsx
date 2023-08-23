import React, { useEffect, useState } from "react";
import styles from "./MultiRangeSlider.module.scss";

interface MultiRangeSliderProps {
  minValue: number;
  maxValue: number;
  leftValue: number;
  rightValue: number;
  onChange: (left: number, right: number) => void;
}

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({
  minValue,
  maxValue,
  leftValue,
  rightValue,
  onChange,
}) => {
  const [leftPercent, setLeftPercent] = useState<number>(
    ((leftValue - minValue) / (maxValue - minValue)) * 100
  );
  const [rightPercent, setRightPercent] = useState<number>(
    ((rightValue - minValue) / (maxValue - minValue)) * 100
  );
  const [showValues, setShowValues] = useState<boolean>(false);

  useEffect(() => {
    setLeftPercent(((leftValue - minValue) / (maxValue - minValue)) * 100);
    setRightPercent(((rightValue - minValue) / (maxValue - minValue)) * 100);
  }, [leftValue, rightValue, minValue, maxValue]);

  const handleLeftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    const right = Math.max(value + 1, rightValue);
    onChange(value, right);
  };

  const handleRightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    const left = Math.min(value - 1, leftValue);
    onChange(left, value);
  };

  const handleMouseEnter = () => {
    setShowValues(true);
  };

  const handleMouseLeave = () => {
    setShowValues(false);
  };

  return (
    <div
      className={`${styles.slider_wrapper} ${showValues ? styles.active : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.slider}>
        <div
          className={styles.track}
          style={{ left: `${leftPercent}%`, right: `${100 - rightPercent}%` }}
        ></div>
        <div
          className={styles.range}
          style={{
            left: `${leftPercent}%`,
            right: `${100 - rightPercent}%`,
          }}
        ></div>
        <div
          className={`${styles.thumb} ${styles.left}`}
          style={{ left: `${leftPercent}%` }}
        ></div>
        <div
          className={`${styles.thumb} ${styles.right}`}
          style={{ right: `${100 - rightPercent}%` }}
        ></div>
      </div>
      <input
        type="range"
        min={minValue}
        max={maxValue}
        value={leftValue}
        onChange={handleLeftChange}
        className={styles.slider_input}
      />
      <input
        type="range"
        min={minValue}
        max={maxValue}
        value={rightValue}
        onChange={handleRightChange}
        className={styles.slider_input}
      />
      <div className={styles.slider_values}>
        <div
          className={styles.slider_value_left}
          style={{ left: `${leftPercent}%` }}
        >
          {leftValue}
        </div>
        <div
          className={styles.slider_value_right}
          style={{ right: `${100 - rightPercent}%` }}
        >
          {rightValue}
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
