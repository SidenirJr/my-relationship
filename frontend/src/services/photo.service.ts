import api from './api';

export interface Photo {
    id: string;
    url: string;
    photoSectionId: string;
    createdAt: string;
    updatedAt: string;
}

export interface PhotoSection {
    id: string;
    title: string;
    description: string | null;
    photos: Photo[];
    createdAt: string;
    updatedAt: string;
}

const photoService = {
    // Seções de fotos
    getAllSections: async (): Promise<PhotoSection[]> => {
        const response = await api.get('/photos');
        return response.data;
    },

    getSectionById: async (id: string): Promise<PhotoSection> => {
        const response = await api.get(`/photos/${id}`);
        return response.data;
    },

    createSection: async (data: { title: string; description?: string }): Promise<PhotoSection> => {
        const response = await api.post('/photos', data);
        return response.data;
    },

    updateSection: async (id: string, data: { title?: string; description?: string }): Promise<PhotoSection> => {
        const response = await api.put(`/photos/${id}`, data);
        return response.data;
    },

    deleteSection: async (id: string): Promise<void> => {
        await api.delete(`/photos/${id}`);
    },

    // Fotos
    addPhotoToSection: async (sectionId: string, file: File): Promise<Photo> => {
        const formData = new FormData();
        formData.append('photo', file);
        
        const response = await api.post(`/photos/${sectionId}/photos`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    deletePhoto: async (photoId: string): Promise<void> => {
        await api.delete(`/photos/photos/${photoId}`);
    },
};

export default photoService;