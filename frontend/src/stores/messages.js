import { defineStore } from 'pinia';

export const useMessageStore = defineStore({
    id: 'messageStore',
    state: () => (
        {
            message: {}
        }
    ),
    actions: {
        setMessage(message) { this.message = message; }
    }

});
