<template>
    <router-link :to="{ name: 'task.show', params: { id: task.id } }"
        class="relative flex flex-col w-60 h-40 pt-6 p-4 shadow rounded-lg bg-gray-800 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" :class="bookmarkColor"
            class="absolute top-0 -translate-y-2 right-2 w-8">
            <path fill-rule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clip-rule="evenodd" />
        </svg>
        <h5 class="mb-2 text-md font-semibold tracking-tight text-gray-900 text-white">{{ task.title }}</h5>
        <div class="mt-auto">
            <span v-if="isOverdue(task.due_date)"
                class="text-xs font-medium inline-flex items-center px-2.5 py-1.5 rounded bg-gray-900 text-red-500 border border-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                    stroke="currentColor" class="w-4 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                Overdue
            </span>
            <span v-else
                class="text-xs font-medium inline-flex items-center px-2.5 py-1.5 rounded mr-2 bg-gray-700 text-gray-400 border border-gray-500">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clip-rule="evenodd"></path>
                </svg>
                {{ formatRemainingTime(task.due_date) }}
            </span>
        </div>
    </router-link>
</template>
  
<script setup>
import { computed } from 'vue';
import { isOverdue, formatRemainingTime } from '../services/date';
const { task } = defineProps({
    task: {
        type: Object,
        required: true
    }
});

const bookmarkColor = computed(() => {
    if (task.priority.id == 1) return 'fill-green-400';
    if (task.priority.id == 2) return 'fill-blue-400';
    if (task.priority.id == 3) return 'fill-red-400';
});



</script>
  