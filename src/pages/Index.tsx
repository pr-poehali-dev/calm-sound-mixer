
import SoundMixer from "@/components/SoundMixer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 text-primary">Звуковой Миксер</h1>
          <p className="text-md text-gray-600">
            Создайте свою идеальную звуковую атмосферу для отдыха и релаксации
          </p>
        </header>
        
        <SoundMixer />
        
        <footer className="mt-10 text-center text-gray-500 text-xs">
          <p>Для лучшего эффекта рекомендуется использовать наушники 🎧</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
