import React, { useRef, useState, useEffect } from "react";

interface VerticalSliderProps {
  value: number;
  onChange: (value: number) => void;
  icon: React.ReactNode;
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({ value, onChange, icon }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const calculateSliderValue = (clientY: number) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const height = rect.height;
    const offsetY = clientY - rect.top;
    
    // Инвертируем значение, чтобы верх был максимальным
    let newValue = Math.round(100 - (offsetY / height) * 100);
    
    // Ограничим значение в пределах 0-100
    newValue = Math.max(0, Math.min(100, newValue));
    
    onChange(newValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    calculateSliderValue(e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    calculateSliderValue(e.touches[0].clientY);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        calculateSliderValue(e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        calculateSliderValue(e.touches[0].clientY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, onChange]);

  return (
    <div className="flex flex-col items-center">
      <div className="sound-icon mb-4 text-primary">
        {icon}
      </div>
      <div 
        ref={sliderRef}
        className="vertical-slider relative"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="vertical-track"></div>
        <div 
          className="vertical-range" 
          style={{ height: `${value}%` }}
        ></div>
        <div 
          className="vertical-thumb"
          style={{ bottom: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default VerticalSlider;
