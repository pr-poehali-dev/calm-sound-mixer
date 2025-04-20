
import React from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

interface MasterVolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (value: number) => void;
  onToggleMute: () => void;
}

const MasterVolumeControl: React.FC<MasterVolumeControlProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute
}) => {
  return (
    <div className="p-4 bg-secondary rounded-lg mt-4">
      <div className="flex items-center mb-2">
        <span className="text-sm font-medium mr-3">Общая громкость</span>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleMute}
          className="ml-auto mr-2 hover:bg-primary/20"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
        <span className="text-xs font-medium px-2 py-1 bg-primary/10 rounded-full text-primary">
          {volume}%
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={isMuted ? 0 : volume}
        onChange={(e) => onVolumeChange(parseInt(e.target.value))}
        className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
      />
    </div>
  );
};

export default MasterVolumeControl;
