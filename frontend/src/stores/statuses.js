import { defineStore } from 'pinia';

export const useStatusStore = defineStore({
    id: 'statusStore',
    state: () => ({
        API_URL: '/api/statuses',
    }),
});
