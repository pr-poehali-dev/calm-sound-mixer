
import SoundMixer from "@/components/SoundMixer";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-animated-gradient p-4 md:p-8 flex flex-col">
      <header className="container max-w-6xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-primary animate-glow">
          Антистрессер
        </h1>
        <ThemeToggle />
      </header>
        
      <main className="flex-1 flex items-center justify-center">
        <SoundMixer />
      </main>
        
      <footer className="container max-w-6xl mx-auto mt-8 text-center text-sm text-muted-foreground">
        <p>Создайте свою идеальную звуковую атмосферу ✨</p>
      </footer>
    </div>
  );
};

export default Index;
