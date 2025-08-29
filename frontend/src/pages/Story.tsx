import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Edit3, Save, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import storyService from "@/services/story.service";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/quill-custom.css';

const Story = ({ isAdmin = false }) => {
    const { isAuthenticated } = useAuth();
    const { toast } = useToast();
    const [storyContent, setStoryContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    
    useEffect(() => {
        fetchStory();
    }, []);
    
    const fetchStory = async () => {
        setIsLoading(true);
        try {
            const story = await storyService.getStory();
            setStoryContent(story.content);
        } catch (error) {
            console.error("Erro ao buscar história:", error);
            toast({
                title: "Erro",
                description: "Não foi possível carregar a história.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleEditClick = () => {
        setEditContent(storyContent);
        setIsEditing(true);
    };
    
    const handleSaveStory = async () => {
        setIsSaving(true);
        try {
            await storyService.updateStory(editContent);
            setStoryContent(editContent);
            setIsEditing(false);
            toast({
                title: "Sucesso",
                description: "História atualizada com sucesso!",
            });
        } catch (error) {
            console.error("Erro ao salvar história:", error);
            toast({
                title: "Erro",
                description: "Não foi possível salvar a história.",
                variant: "destructive"
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center items-center space-x-2 mb-4">
                        <BookOpen className="h-8 w-8 text-primary" />
                        <Heart className="h-6 w-6 text-primary-light animate-pulse" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-romantic bg-clip-text text-transparent mb-4">
                        Nossa História
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        A história do nosso amor, contada com o coração
                    </p>
                </div>

                {/* Story Content */}
                <Card className="p-8 md:p-12 shadow-romantic relative overflow-hidden">
                    <div className="absolute top-6 right-6 opacity-10">
                        <Heart className="h-24 w-24" />
                    </div>

                    <div className="relative z-10">
                        {isAuthenticated && (
                            <div className="flex justify-end mb-6">
                                <Button variant="ghost" size="sm" onClick={handleEditClick}>
                                    <Edit3 className="h-4 w-4 mr-2" />
                                    Editar História
                                </Button>
                            </div>
                        )}

                        {isLoading ? (
                            <div className="flex justify-center items-center py-20">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <span className="ml-2 text-muted-foreground">Carregando história...</span>
                            </div>
                        ) : (
                            <div className="prose prose-lg max-w-none story-content">
                                <div 
                                    className="text-foreground leading-relaxed ql-editor" 
                                    dangerouslySetInnerHTML={{ __html: storyContent }}
                                />
                            </div>
                        )}

                        {/* Decorative Elements */}
                        <div className="mt-12 pt-8 border-t border-border/50">
                            <div className="flex justify-center items-center space-x-4 text-muted-foreground">
                                <Heart className="h-5 w-5 text-primary" />
                                <span className="text-sm italic">Escrito com amor</span>
                                <Heart className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Dialog de edição */}
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Editar Nossa História</DialogTitle>
                        </DialogHeader>
                        <div className="min-h-[50vh]">
                            <ReactQuill
                                theme="snow"
                                value={editContent}
                                onChange={setEditContent}
                                placeholder="Escreva nossa história aqui..."
                                modules={{
                                    toolbar: [
                                        [{ 'header': [1, 2, 3, false] }],
                                        ['bold', 'italic', 'underline', 'strike'],
                                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                        [{ 'indent': '-1'}, { 'indent': '+1' }],
                                        [{ 'align': [] }],
                                        ['link'],
                                        ['clean']
                                    ],
                                }}
                                formats={[
                                    'header',
                                    'bold', 'italic', 'underline', 'strike',
                                    'list', 'bullet', 'indent',
                                    'align',
                                    'link'
                                ]}
                                style={{ height: '400px', marginBottom: '50px' }}
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
                            <Button onClick={handleSaveStory} disabled={isSaving}>
                                {isSaving ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Salvar
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default Story;