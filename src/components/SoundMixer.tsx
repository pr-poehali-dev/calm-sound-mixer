
import React from "react";
import SoundControl from "./SoundControl";
import MasterVolumeControl from "./MasterVolumeControl";
import { useAudioManager } from "@/hooks/useAudioManager";
import { initialSounds } from "@/types/sound";

const SoundMixer: React.FC = () => {
  const {
    sounds,
    masterVolume,
    isMuted,
    handleVolumeChange,
    toggleMute,
    handleMasterVolumeChange
  } = useAudioManager(initialSounds);

  return (
    <div className="bg-background rounded-lg shadow-md p-6 w-full max-w-4xl mx-auto border border-border">
      <div className="flex justify-between items-start w-full mb-8">
        {sounds.map((sound) => (
          <SoundControl 
            key={sound.id}
            id={sound.id}
            icon={sound.icon}
            volume={sound.volume}
            onVolumeChange={handleVolumeChange}
          />
        ))}
      </div>
      
      <MasterVolumeControl 
        volume={masterVolume}
        isMuted={isMuted}
        onVolumeChange={handleMasterVolumeChange}
        onToggleMute={toggleMute}
      />
      
      <footer className="mt-8 pt-4 border-t border-border">
        <p className="text-center text-xs text-muted-foreground">
          Используйте ползунки для настройки идеальной звуковой атмосферы
        </p>
      </footer>
    </div>
  );
};

export default SoundMixer;
