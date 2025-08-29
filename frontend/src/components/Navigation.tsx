import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Home, Camera, BookOpen, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();

    const navItems = [
        { path: "/", icon: Home, label: "Início" },
        { path: "/fotos", icon: Camera, label: "Fotos" },
        { path: "/historia", icon: BookOpen, label: "História" },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <Heart className="h-6 w-6 text-primary animate-pulse" />
                        <span className="text-xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
                            Nossa História
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navItems.map((item) => (
                            <Link key={item.path} to={item.path}>
                                <Button
                                    variant={isActive(item.path) ? "romantic" : "ghost"}
                                    size="sm"
                                    className="flex items-center space-x-2"
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </Button>
                            </Link>
                        ))}
                        {isAuthenticated && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={logout}
                                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Sair</span>
                            </Button>
                        )}
                    </div>

                    {/* Mobile Navigation Toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>

                {/* Mobile Navigation Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="space-y-2">
                            {navItems.map((item) => (
                                <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                                    <Button
                                        variant={isActive(item.path) ? "romantic" : "ghost"}
                                        size="sm"
                                        className="w-full justify-start space-x-2"
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </Button>
                                </Link>
                            ))}
                            {isAuthenticated && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                    className="w-full justify-start space-x-2 text-muted-foreground hover:text-foreground"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Sair</span>
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;