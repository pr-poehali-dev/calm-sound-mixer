
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
    <div className="bg-[#f9f9f9] rounded-lg shadow p-4 w-full max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-primary">Звуковой микшер</h2>
      </header>
      
      <div className="flex flex-wrap justify-center gap-8 mb-4">
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
      
      <footer className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-center text-xs text-gray-400">
          Используйте ползунки для настройки идеальной звуковой атмосферы
        </p>
      </footer>
    </div>
  );
};

export default SoundMixer;
