
import SoundMixer from "@/components/SoundMixer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-primary">Звуковой Миксер</h1>
          <p className="text-xl text-gray-600">
            Создайте свою идеальную звуковую атмосферу для отдыха и релаксации
          </p>
        </header>
        
        <SoundMixer />
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Используйте ползунки для настройки громкости каждого звука</p>
          <p className="mt-2">Для лучшего эффекта рекомендуется использовать наушники 🎧</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
