<template>
    <router-link :to="{ name: 'task.show', params: { id: task.id } }" draggable="true"
        class="overflow-hidden block relative w-72 sm:w-full sm:max-w-sm p-6 cursor-pointer border rounded-lg shadow bg-gray-800 border-gray-700 hover:border-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" :class="bookmarkColor"
            class="absolute top-0 -translate-y-2 right-2 w-8">
            <path fill-rule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clip-rule="evenodd" />
        </svg>
        <router-link :to="{ name: 'category.show', params: { id: task.category.id } }"
            class="mb-3 text-gray-300 text-sm font-medium inline-block py-1 px-3 rounded border border-gray-300 bg-gray-900">
            {{ task.category.name }}
        </router-link>
        <h5 class="mb-2 text-md font-semibold tracking-tight text-white">{{ task.title }}</h5>
        <p class="mb-6 font-normal text-sm text-gray-400 text-justify">{{ task.description }}</p>
        <div v-if="isCompleted(task)">
            <span
                class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-1.5 rounded bg-gray-700 text-green-400 border border-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mr-1">
                    <path fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd" />
                </svg>
                completed
            </span>
        </div>
        <div v-else>
            <span v-if="isOverdue(task.due_date)"
                class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-1.5 rounded bg-gray-900 text-red-500 border border-red-500">
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
import TaskCardActionButton from './TaskCardActionButton.vue';
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

function isCompleted(task) {
    return task.status.id == 3;
}

</script>
