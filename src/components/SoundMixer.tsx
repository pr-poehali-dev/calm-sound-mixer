
import { useState, useEffect, useRef } from "react";
import VerticalSlider from "./VerticalSlider";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

// Типы звуков
interface Sound {
  id: string;
  name: string;
  icon: string;
  audio: string;
  volume: number;
}

const SoundMixer = () => {
  // Список звуков с начальной громкостью 0
  const [sounds, setSounds] = useState<Sound[]>([
    { 
      id: "rain", 
      name: "Дождь", 
      icon: "☁️", 
      audio: "/sounds/rain.mp3", 
      volume: 0 
    },
    { 
      id: "wind", 
      name: "Ветер", 
      icon: "💨", 
      audio: "/sounds/wind.mp3", 
      volume: 0 
    },
    { 
      id: "lightning", 
      name: "Гроза", 
      icon: "⚡", 
      audio: "/sounds/lightning.mp3", 
      volume: 0 
    },
    { 
      id: "fire", 
      name: "Огонь", 
      icon: "🔥", 
      audio: "/sounds/fire.mp3", 
      volume: 0 
    },
    { 
      id: "stream", 
      name: "Ручей", 
      icon: "💧", 
      audio: "/sounds/stream.mp3", 
      volume: 0 
    },
    { 
      id: "frog", 
      name: "Лягушка", 
      icon: "🐸", 
      audio: "/sounds/frog.mp3", 
      volume: 0 
    },
    { 
      id: "birds", 
      name: "Птицы", 
      icon: "🐦", 
      audio: "/sounds/birds.mp3", 
      volume: 0 
    },
    { 
      id: "cicada", 
      name: "Цикада", 
      icon: "🦗", 
      audio: "/sounds/cicada.mp3", 
      volume: 0 
    },
  ]);

  // Для хранения аудио элементов
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const [masterVolume, setMasterVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const prevMasterVolume = useRef<number>(80);

  // Инициализация аудио элементов
  useEffect(() => {
    sounds.forEach(sound => {
      const audio = new Audio();
      audio.src = sound.audio;
      audio.loop = true;
      audio.volume = 0;
      audioRefs.current[sound.id] = audio;
    });

    // Очистка при размонтировании
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = "";
        }
      });
    };
  }, []);

  // Обновление громкости при изменении ползунков
  useEffect(() => {
    sounds.forEach(sound => {
      const audio = audioRefs.current[sound.id];
      if (audio) {
        // Применяем мастер-громкость
        const effectiveVolume = isMuted ? 0 : (sound.volume * masterVolume / 100);
        audio.volume = effectiveVolume / 100;
        
        // Запуск или приостановка аудио
        if (effectiveVolume > 0 && audio.paused) {
          audio.play().catch(e => console.error("Ошибка воспроизведения:", e));
        } else if (effectiveVolume === 0 && !audio.paused) {
          audio.pause();
        }
      }
    });
  }, [sounds, masterVolume, isMuted]);

  // Изменение громкости для отдельного звука
  const handleVolumeChange = (id: string, newVolume: number) => {
    setSounds(prevSounds => 
      prevSounds.map(sound => 
        sound.id === id ? { ...sound, volume: newVolume } : sound
      )
    );
  };

  // Включение/выключение звука
  const toggleMute = () => {
    if (isMuted) {
      setMasterVolume(prevMasterVolume.current);
      setIsMuted(false);
    } else {
      prevMasterVolume.current = masterVolume;
      setIsMuted(true);
    }
  };

  return (
    <div className="bg-[#f9f9f9] rounded-lg shadow p-4 w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-primary">Звуковой микшер</h2>
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMute}
            className="mr-2"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
          <div className="text-sm font-medium">{masterVolume}%</div>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8 mt-8 mb-4">
        {sounds.map((sound) => (
          <div key={sound.id} className="text-center">
            <VerticalSlider
              value={sound.volume}
              onChange={(value) => handleVolumeChange(sound.id, value)}
              icon={<span className="text-2xl">{sound.icon}</span>}
            />
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-8 gap-8 mt-2 mb-6 px-4">
        {sounds.map((sound) => (
          <div key={sound.id} className="text-center">
            <span className="text-xs text-gray-500">{sound.volume}%</span>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-gray-100 rounded-lg mt-4">
        <div className="flex items-center mb-2">
          <span className="text-sm font-medium mr-3">Общая громкость</span>
          <span className="ml-auto text-xs text-gray-500">{masterVolume}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={isMuted ? 0 : masterVolume}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (val > 0 && isMuted) setIsMuted(false);
            setMasterVolume(val);
          }}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-center text-xs text-gray-400">
          Используйте ползунки для настройки идеальной звуковой атмосферы
        </p>
      </div>
    </div>
  );
};

export default SoundMixer;
