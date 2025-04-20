
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
];
