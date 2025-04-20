
import React from "react";
import VerticalSlider from "./VerticalSlider";

interface SoundControlProps {
  id: string;
  icon: string;
  volume: number;
  onVolumeChange: (id: string, volume: number) => void;
}

const SoundControl: React.FC<SoundControlProps> = ({
  id,
  icon,
  volume,
  onVolumeChange
}) => {
  return (
    <div className="text-center">
      <VerticalSlider
        value={volume}
        onChange={(value) => onVolumeChange(id, value)}
        icon={<span className="text-2xl">{icon}</span>}
      />
      <span className="text-xs text-gray-500 mt-2 block">{volume}%</span>
    </div>
  );
};

export default SoundControl;
