import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Photos from "./pages/Photos";
import Story from "./pages/Story";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Layout><Home /></Layout>} />
                        <Route path="/fotos" element={<Layout><Photos /></Layout>} />
                        <Route path="/historia" element={<Layout><Story /></Layout>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin/fotos" element={
                            <ProtectedRoute>
                                <Layout><Photos isAdmin={true} /></Layout>
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/historia" element={
                            <ProtectedRoute>
                                <Layout><Story isAdmin={true} /></Layout>
                            </ProtectedRoute>
                        } />
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
