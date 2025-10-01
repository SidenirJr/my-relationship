import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();
    const { login, isLoading } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const success = await login(credentials.username, credentials.password);
        
        if (success) {
            navigate('/admin/fotos');
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center space-x-2 mb-4">
                        <Lock className="h-8 w-8 text-primary" />
                        <Heart className="h-6 w-6 text-primary-light animate-pulse" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-romantic bg-clip-text text-transparent mb-2">
                        Acesso Secreto
                    </h1>
                </div>

                {/* Login Form */}
                <Card className="p-6 shadow-romantic">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username">Usuário</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Digite seu usuário"
                                value={credentials.username}
                                onChange={(e) => setCredentials(prev => ({
                                    ...prev,
                                    username: e.target.value
                                }))}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    value={credentials.password}
                                    onChange={(e) => setCredentials(prev => ({
                                        ...prev,
                                        password: e.target.value
                                    }))}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="romantic"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Entrando...</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Heart className="h-4 w-4" />
                                    <span>Entrar</span>
                                </div>
                            )}
                        </Button>
                    </form>
                </Card>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        🔒 Esta página é protegida por amor e carinho
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;