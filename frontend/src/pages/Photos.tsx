import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Plus, Edit3, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import photoService, { PhotoSection as PhotoSectionType, Photo as PhotoType } from '@/services/photo.service';

interface PhotosProps {
    isAdmin?: boolean;
}

const Photos = ({ isAdmin = false }: PhotosProps) => {
    const [photoSections, setPhotoSections] = useState<PhotoSectionType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const { user, isAuthenticated } = useAuth();

    const fetchPhotoSections = async () => {
        try {
            setIsLoading(true);
            const sections = await photoService.getAllSections();
            console.log('Sections loaded:', sections);
            console.log('First section photos:', sections[0]?.photos);
            setPhotoSections(sections);
        } catch (error) {
            console.error('Erro ao carregar seções de fotos:', error);
            toast({
                title: 'Erro ao carregar fotos',
                description: 'Não foi possível carregar as fotos. Tente novamente.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotoSections();
    }, []);

    const handleAddPhoto = async (sectionId: string) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                try {
                    const newPhoto = await photoService.addPhotoToSection(sectionId, file);
                    setPhotoSections(photoSections.map(section => 
                        section.id === sectionId 
                            ? { ...section, photos: [...section.photos, newPhoto] }
                            : section
                    ));
                    toast({
                        title: 'Foto adicionada com sucesso!',
                        description: 'A nova foto foi adicionada à galeria.',
                    });
                } catch (error) {
                    console.error('Erro ao adicionar foto:', error);
                    toast({
                        title: 'Erro ao adicionar foto',
                        description: 'Não foi possível adicionar a foto. Tente novamente.',
                        variant: 'destructive',
                    });
                }
            }
        };
        input.click();
    };

    const handleDeleteSection = async (sectionId: string) => {
        if (confirm('Tem certeza que deseja excluir esta seção e todas as suas fotos?')) {
            try {
                await photoService.deleteSection(sectionId);
                setPhotoSections(photoSections.filter(section => section.id !== sectionId));
                toast({
                    title: 'Seção excluída com sucesso!',
                    description: 'A seção e todas as suas fotos foram removidas.',
                });
            } catch (error) {
                console.error('Erro ao excluir seção:', error);
                toast({
                    title: 'Erro ao excluir seção',
                    description: 'Não foi possível excluir a seção. Tente novamente.',
                    variant: 'destructive',
                });
            }
        }
    };

    const handleDeletePhoto = async (photoId: string, sectionId: string) => {
        if (confirm('Tem certeza que deseja excluir esta foto?')) {
            try {
                await photoService.deletePhoto(photoId);
                setPhotoSections(photoSections.map(section => {
                    if (section.id === sectionId) {
                        return {
                            ...section,
                            photos: section.photos.filter(photo => photo.id !== photoId)
                        };
                    }
                    return section;
                }));
                toast({
                    title: 'Foto excluída com sucesso!',
                    description: 'A foto foi removida permanentemente.',
                });
            } catch (error) {
                console.error('Erro ao excluir foto:', error);
                toast({
                    title: 'Erro ao excluir foto',
                    description: 'Não foi possível excluir a foto. Tente novamente.',
                    variant: 'destructive',
                });
            }
        }
    };

    const PhotoCarousel = ({ photos, title, sectionId }: { photos: PhotoType[]; title: string; sectionId: string }) => {
        return (
            <Card className="p-6 shadow-soft hover:shadow-romantic transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold flex items-center">
                        <Heart className="h-5 w-5 text-primary mr-2" />
                        {title}
                    </h3>
                    {(isAdmin || isAuthenticated) && (
                        <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" onClick={() => {
                                const newTitle = prompt('Digite o novo título da seção:', title);
                                if (newTitle && newTitle !== title) {
                                    photoService.updateSection(sectionId, { title: newTitle })
                                        .then(() => {
                                            setPhotoSections(photoSections.map(section => 
                                                section.id === sectionId ? { ...section, title: newTitle } : section
                                            ));
                                            toast({
                                                title: 'Seção atualizada!',
                                                description: 'O título da seção foi atualizado com sucesso.',
                                            });
                                        })
                                        .catch(error => {
                                            console.error('Erro ao atualizar seção:', error);
                                            toast({
                                                title: 'Erro ao atualizar seção',
                                                description: 'Não foi possível atualizar a seção. Tente novamente.',
                                                variant: 'destructive',
                                            });
                                        });
                                }
                            }}>
                                <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteSection(sectionId)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {photos.map((photo) => {
                        const imageUrl = photo.url;
                        console.log('Rendering image:', imageUrl, 'Photo data:', photo);
                        return (
                            <div key={photo.id} className="relative group overflow-hidden rounded-lg">
                                <img
                                    src={imageUrl}
                                    alt={`${title} - Foto`}
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                    onError={(e) => {
                                        console.error('Erro ao carregar imagem:', imageUrl, 'Photo:', photo);
                                    }}
                                    onLoad={() => {
                                        console.log('Imagem carregada com sucesso:', imageUrl);
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-romantic opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                                
                                {(isAdmin || isAuthenticated) && (
                                    <Button 
                                        variant="destructive" 
                                        size="sm" 
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => handleDeletePhoto(photo.id, sectionId)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        );
                    })}
                    
                    {(isAdmin || isAuthenticated) && (
                        <div 
                            className="h-48 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center hover:border-primary transition-colors cursor-pointer"
                            onClick={() => handleAddPhoto(sectionId)}
                        >
                            <div className="text-center">
                                <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground">Adicionar Foto</p>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        );
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-romantic bg-clip-text text-transparent mb-4">
                        {(isAdmin || isAuthenticated) ? 'Gerenciar Fotos' : 'Nossas Memórias'}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {(isAdmin || isAuthenticated) 
                            ? 'Adicione, edite ou remova fotos e seções da galeria' 
                            : 'Uma coleção dos nossos momentos mais especiais, organizados com muito carinho'}
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : photoSections.length === 0 ? (
                    <div className="text-center py-20">
                        <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                            Nenhuma foto ainda
                        </h3>
                        <p className="text-muted-foreground">
                            {(isAdmin || isAuthenticated) ? 'Adicione a primeira seção de fotos!' : 'Em breve teremos fotos aqui!'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {photoSections.map((section) => (
                            <PhotoCarousel
                                key={section.id}
                                photos={section.photos}
                                title={section.title}
                                sectionId={section.id}
                            />
                        ))}
                    </div>
                )}

                {(isAdmin || isAuthenticated) && (
                    <div className="text-center mt-12">
                        <Button
                            onClick={async () => {
                                const title = prompt('Digite o título da nova seção:');
                                if (title) {
                                    try {
                                        const newSection = await photoService.createSection({ title });
                                        setPhotoSections([...photoSections, { ...newSection, photos: [] }]);
                                        toast({
                                            title: 'Seção criada com sucesso!',
                                            description: 'Nova seção adicionada à galeria.',
                                        });
                                    } catch (error) {
                                        console.error('Erro ao criar seção:', error);
                                        toast({
                                            title: 'Erro ao criar seção',
                                            description: 'Não foi possível criar a seção. Tente novamente.',
                                            variant: 'destructive',
                                        });
                                    }
                                }
                            }}
                            className="bg-gradient-romantic hover:opacity-90 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-soft hover:shadow-romantic"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Adicionar Nova Seção
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Photos;