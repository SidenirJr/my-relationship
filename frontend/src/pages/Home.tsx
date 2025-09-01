import { Heart, Sparkles } from "lucide-react";
import LoveCounter from "@/components/LoveCounter";

const Home = () => {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="flex justify-center items-center space-x-2 mb-4">
                        <Heart className="h-8 w-8 text-primary animate-pulse" />
                        <Sparkles className="h-6 w-6 text-primary-light animate-bounce" />
                        <Heart className="h-8 w-8 text-primary animate-pulse" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-romantic bg-clip-text text-transparent mb-4">
                        Seu nome & Nome do seu amor
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Cada segundo, cada minuto, cada dia que passamos juntos é especial. 
                        Acompanhe nossa jornada de amor em tempo real.
                    </p>
                </div>

                {/* Love Counter */}
                <div className="mb-12">
                    <LoveCounter />
                </div>

                {/* Decorative Elements */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-6">
                        <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Momentos Especiais</h3>
                        <p className="text-muted-foreground">
                            Cada momento ao seu lado é único e inesquecível
                        </p>
                    </div>
                    <div className="p-6">
                        <Sparkles className="h-12 w-12 text-primary-light mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Memórias Preciosas</h3>
                        <p className="text-muted-foreground">
                            Colecionando lembranças que durarão para sempre
                        </p>
                    </div>
                    <div className="p-6">
                        <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Amor Verdadeiro</h3>
                        <p className="text-muted-foreground">
                            Um amor que cresce a cada dia que passa
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;