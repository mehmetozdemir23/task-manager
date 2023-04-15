<template>
    <div style="z-index:9999;" class="fixed top-2 left-0 right-0 flex justify-center">
        <div class="flex items-center w-max p-4 rounded-lg shadow text-gray-400 bg-gray-900">
            <div class="flex items-center mx-2">
                <div v-html="icon"></div>
                <div class="ml-3 text-sm font-normal">{{ message.content }}</div>
            </div>
            <button type="button" @click="close"
                class="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700"
                aria-label="Close">
                <span class="sr-only">Close</span>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted } from 'vue';
import { useMessageStore } from '../stores/messages';
const { message } = defineProps({
    message: {
        type: Object,
    }
});

const icon = computed(() => {
    switch (message.type) {
        case 'info':
            return `<div
                class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-blue-800 text-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                </svg>
                <span class="sr-only">info icon</span>
            </div>`;
        case 'success':
            return `<div
                class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-green-800 text-green-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                </svg>
                <span class="sr-only">check icon</span>
            </div>`;
        case 'warning':
            return `<div
                class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-red-800 text-red-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                </svg>
                <span class="sr-only">warning icon</span>
            </div>`;
        default:
            break;
    }
});

onMounted(() => {
    setTimeout(close, 4000);
});

function close() {
    const messageStore = useMessageStore();
    messageStore.setMessage({});
}
</script>
 