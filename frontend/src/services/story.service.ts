import api from './api';

export interface Story {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

const storyService = {
    getStory: async (): Promise<Story> => {
        const response = await api.get('/story');
        return response.data;
    },

    updateStory: async (content: string): Promise<Story> => {
        // Assumindo que existe apenas uma história com ID fixo
        const response = await api.put('/story/1', { content });
        return response.data;
    },
};

export default storyService;