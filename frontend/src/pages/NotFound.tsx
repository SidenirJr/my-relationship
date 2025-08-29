import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Home } from "lucide-react";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-gradient-soft flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="mb-6">
                    <Heart className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
                </div>
                <h1 className="text-6xl font-bold bg-gradient-romantic bg-clip-text text-transparent mb-4">
                    404
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                    Oops! Esta página não foi encontrada
                </p>
                <p className="text-muted-foreground mb-8">
                    Parece que você se perdeu em nossa jornada de amor. Que tal voltar para o início?
                </p>
                <Link to="/">
                    <Button variant="romantic" size="lg" className="space-x-2">
                        <Home className="h-5 w-5" />
                        <span>Voltar ao Início</span>
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
