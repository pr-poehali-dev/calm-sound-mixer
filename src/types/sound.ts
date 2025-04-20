
// Типы для работы со звуками
export interface Sound {
  id: string;
  name: string;
  icon: string;
  audio: string;
  volume: number;
}

export const initialSounds: Sound[] = [
  { 
    id: "rain", 
    name: "Дождь", 
    icon: "🌧️", 
    audio: "https://cdn.pixabay.com/download/audio/2024/05/21/audio_08ef8717b4.mp3", 
    volume: 0 
  },
  { 
    id: "wind", 
    name: "Ветер", 
    icon: "💨", 
    audio: "https://cdn.pixabay.com/download/audio/2025/02/15/audio_a4554362e4.mp3", 
    volume: 0 
  },
  { 
    id: "fire", 
    name: "Огонь", 
    icon: "🔥", 
    audio: "https://cdn.pixabay.com/download/audio/2024/07/05/audio_cb6e14bf87.mp3", 
    volume: 0 
  },
  { 
    id: "birds", 
    name: "Птицы", 
    icon: "🐦", 
    audio: "https://cdn.pixabay.com/download/audio/2023/10/28/audio_07f4ccc110.mp3", 
    volume: 0 
  },
  { 
    id: "frog", 
    name: "Лягушки", 
    icon: "🐸", 
    audio: "https://cdn.pixabay.com/download/audio/2023/05/31/audio_4e80e355d3.mp3", 
    volume: 0 
  }
];
