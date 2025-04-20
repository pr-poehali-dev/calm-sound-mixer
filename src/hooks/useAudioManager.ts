
import { useState, useRef, useEffect } from "react";
import { Sound } from "@/types/sound";

export const useAudioManager = (initialSounds: Sound[]) => {
  const [sounds, setSounds] = useState<Sound[]>(initialSounds);
  const [masterVolume, setMasterVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const prevMasterVolume = useRef<number>(80);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

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

  // Изменение общей громкости
  const handleMasterVolumeChange = (value: number) => {
    if (value > 0 && isMuted) setIsMuted(false);
    setMasterVolume(value);
  };

  return {
    sounds,
    masterVolume,
    isMuted,
    handleVolumeChange,
    toggleMute,
    handleMasterVolumeChange
  };
};
