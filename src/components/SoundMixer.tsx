
import { useState, useEffect, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { 
  Cloud, 
  Flame, 
  Wind, 
  Waves, 
  Music, 
  Bird, 
  Volume2,
  VolumeX
} from "lucide-react";

// Типы звуков
interface Sound {
  id: string;
  name: string;
  icon: React.ReactNode;
  audio: string;
  volume: number;
}

const SoundMixer = () => {
  // Список звуков с начальной громкостью 0
  const [sounds, setSounds] = useState<Sound[]>([
    { 
      id: "rain", 
      name: "Дождь", 
      icon: <Cloud className="w-5 h-5" />, 
      audio: "/sounds/rain.mp3", 
      volume: 0 
    },
    { 
      id: "fire", 
      name: "Огонь", 
      icon: <Flame className="w-5 h-5" />, 
      audio: "/sounds/fire.mp3", 
      volume: 0 
    },
    { 
      id: "wind", 
      name: "Ветер", 
      icon: <Wind className="w-5 h-5" />, 
      audio: "/sounds/wind.mp3", 
      volume: 0 
    },
    { 
      id: "waves", 
      name: "Волны", 
      icon: <Waves className="w-5 h-5" />, 
      audio: "/sounds/waves.mp3", 
      volume: 0 
    },
    { 
      id: "birds", 
      name: "Птицы", 
      icon: <Bird className="w-5 h-5" />, 
      audio: "/sounds/birds.mp3", 
      volume: 0 
    },
    { 
      id: "stream", 
      name: "Ручей", 
      icon: <Music className="w-5 h-5" />, 
      audio: "/sounds/stream.mp3", 
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
  const handleVolumeChange = (id: string, newVolume: number[]) => {
    setSounds(prevSounds => 
      prevSounds.map(sound => 
        sound.id === id ? { ...sound, volume: newVolume[0] } : sound
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
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">Миксер Успокаивающих Звуков</h1>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-medium">Общая громкость</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMute}
            className="ml-2"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
        </div>
        <Slider 
          value={[isMuted ? 0 : masterVolume]} 
          min={0} 
          max={100} 
          step={1}
          onValueChange={(value) => {
            if (value[0] > 0 && isMuted) setIsMuted(false);
            setMasterVolume(value[0]);
          }}
          className="mb-8"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sounds.map((sound) => (
          <div key={sound.id} className="bg-gray-50 rounded-md p-4">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-primary/10 rounded-full mr-3">
                {sound.icon}
              </div>
              <span className="font-medium">{sound.name}</span>
              <span className="ml-auto text-sm text-gray-500">{sound.volume}%</span>
            </div>
            <Slider
              value={[sound.volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => handleVolumeChange(sound.id, value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoundMixer;
