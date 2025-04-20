
import SoundMixer from "@/components/SoundMixer";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Звуковой микшер
          </h1>
          <ThemeToggle />
        </header>
        
        <main>
          <SoundMixer />
        </main>
        
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>Создайте свою идеальную звуковую атмосферу</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
