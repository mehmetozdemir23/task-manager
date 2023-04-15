import { defineStore } from 'pinia';

export const usePriorityStore = defineStore({
    id: 'priorityStore',
    state: () => ({
        API_URL: '/api/priorities',
    }),
});