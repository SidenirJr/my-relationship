import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface TimeUnit {
    value: number;
    label: string;
}

// Data de início do namoro
const START_DATE = new Date("2025-05-10T15:42:00"); // Sidenir e Ludimila

const LoveCounter: React.FC = () => {
    console.log("LoveCounter component rendering...");
    
    const [timeElapsed, setTimeElapsed] = useState<TimeUnit[]>([]);

    useEffect(() => {
        console.log("useEffect running in LoveCounter");
        const calculateTime = () => {
            const now = new Date();
            const diff = now.getTime() - START_DATE.getTime();

            // Garantir que não temos valores negativos
            if (diff < 0) {
                setTimeElapsed([
                    { value: 0, label: "dias" },
                    { value: 0, label: "horas" },
                    { value: 0, label: "minutos" },
                    { value: 0, label: "segundos" },
                ]);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeElapsed([
                { value: days, label: days === 1 ? "dia" : "dias" },
                { value: hours, label: hours === 1 ? "hora" : "horas" },
                { value: minutes, label: minutes === 1 ? "minuto" : "minutos" },
                { value: seconds, label: seconds === 1 ? "segundo" : "segundos" },
            ]);
        };

        calculateTime();
        const interval = setInterval(calculateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="space-y-6">
            <Card className="p-8 bg-gradient-romantic text-white shadow-romantic border-0 relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-20">
                    <Heart className="h-16 w-16" />
                </div>
                <div className="relative z-10">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-2">Namorando desde</h2>
                        <p className="text-lg opacity-90">{formatDate(START_DATE)}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {timeElapsed.map((unit, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                                    <div className="text-3xl font-bold">{unit.value}</div>
                                    <div className="text-sm opacity-90 capitalize">{unit.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            <div className="text-center">
                <p className="text-muted-foreground">
                    ❤️ Contando cada momento especial juntos ❤️
                </p>
            </div>
        </div>
    );
};

export default LoveCounter;