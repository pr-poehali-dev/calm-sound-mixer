
import React, { useState, useRef, useEffect } from "react";

interface VerticalSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  icon?: React.ReactNode;
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  icon
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const calculateValue = (clientY: number) => {
    if (!sliderRef.current) return value;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const height = rect.height;
    const relativeY = clientY - rect.top;
    
    // Инвертированное значение, поскольку верх это 100%, низ это 0%
    let percentage = 1 - Math.min(Math.max(relativeY / height, 0), 1);
    let newValue = Math.round(percentage * (max - min) + min);
    
    return newValue;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    onChange(calculateValue(e.clientY));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    onChange(calculateValue(e.touches[0].clientY));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onChange(calculateValue(e.clientY));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        onChange(calculateValue(e.touches[0].clientY));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, onChange]);

  const percentValue = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col items-center">
      {icon && <div className="sound-icon mb-2">{icon}</div>}
      <div 
        ref={sliderRef}
        className="vertical-slider relative"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="vertical-track absolute inset-0"></div>
        <div 
          className="vertical-range"
          style={{ height: `${percentValue}%` }}
        ></div>
        <div 
          className="vertical-thumb"
          style={{ bottom: `${percentValue}%` }}
        ></div>
      </div>
    </div>
  );
};

export default VerticalSlider;
