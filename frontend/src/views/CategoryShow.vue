<template>
    <div class="relative flex flex-col sm:block overflow-hidden w-full h-full p-8">
        <div class="flex items-center space-x-2 font-semibold mb-8 sm:mb-16">
            <router-link :to="{ name: 'category.index' }"
                class="text-xl text-gray-400 hover:underline">Categories</router-link>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor"
                class="mt-1 h-4 text-gray-200">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span class="text-xl text-white">
                {{ category.name }}
            </span>
        </div>
        <div class="mb-8 sm:mb-0 sm:fixed sm:top-8 sm:right-8 flex space-x-4">
            <router-link :to="{ name: 'task.create', query: { categoryId: category.id } }"
                class="px-4 py-2 flex items-center rounded-lg bg-blue-500 shadow-md hover:bg-blue-700 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white mr-2">
                    <path d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span class="text-white font-bold">New task</span>
            </router-link>
            <router-link :to="{ name: 'category.delete', params: { id: category.id } }"
                class="flex items-center px-3 py-1.5 space-x-2 group text-red-500 border-2 border-red-600 hover:bg-red-500 hover:text-gray-800 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    class="h-5 fill-red-500 group-hover:fill-gray-700">
                    <path fill-rule="evenodd"
                        d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                        clip-rule="evenodd" />
                </svg>
                <span>Delete</span>
            </router-link>
        </div>
        <div class="overflow-x-scroll">
            <table class="w-full text-sm text-left text-gray-400 shadow-md rounded-md">
                <thead class="text-xs uppercase bg-gray-800 text-gray-400 border-b-2 border-gray-600">
                    <tr>
                        <th scope="col" class="pl-6">
                            Task title
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Priority
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col">
                        </th>
                    </tr>
                </thead>
                <tbody v-if="paginatedCategoryTasks.length">
                    <tr v-for="task in paginatedCategoryTasks" :key="task.id" class="border-b bg-gray-800 border-gray-700">
                        <th scope="row" class="pl-6 font-medium whitespace-nowrap text-white">
                            {{ task.title }}
                        </th>
                        <td class="px-6 py-4 font-bold" :class="getPriorityColor(task.priority.id)">
                            {{ task.priority.name }}
                        </td>
                        <td class="w-max flex items-center px-6 py-4">
                            <span class="block mr-2 w-2 h-2 rounded-full" :class="getStatusColor(task.status.id)"></span>
                            <div class="mb-1">
                                {{ task.status.name }}
                            </div>
                        </td>
                        <td class="px-6 py-3">
                            <router-link :to="{ name: 'task.show', params: { id: task.id } }"
                                class="flex rounded w-max p-2 bg-gray-600 hover:bg-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                </svg>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr class="relative h-96">
                        <div
                            class="absolute top-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-16">
                            <p class="w-max text-lg font-semibold">No tasks yet</p>
                        </div>
                    </tr>
                </tbody>
            </table>
        </div>
        <Pagination v-if="categoryTasks.length"
            class="mt-auto mx-auto sm:absolute sm:bottom-8 sm:left-1/2 sm:transform sm:-translate-x-1/2" />
    </div>
</template>
<script setup>
import { computed, onMounted } from 'vue';
import { useTaskStore } from '@/stores/tasks';
import { useCategoryStore } from '@/stores/categories';
import { usePaginationStore } from '../stores/pagination';
import { useRouter } from 'vue-router';
import Pagination from '../components/Pagination.vue';

const { id } = defineProps({
    id: {
        type: [Number, String]
    }
});

const router = useRouter();
const paginationStore = usePaginationStore();
const startIndex = computed(() => paginationStore.startIndex);
const endIndex = computed(() => paginationStore.endIndex)

const categoryStore = useCategoryStore();
const category = computed(() => categoryStore.getInstanceById(id));

const taskStore = useTaskStore();
const categoryTasks = computed(() =>
    categoryStore.getAllTasks(category.value.id, taskStore)
);

const paginatedCategoryTasks = computed(() =>
    categoryTasks.value.slice(startIndex.value, endIndex.value + 1)
);

onMounted(async () => {
    await taskStore.fill();
    await categoryStore.fill();
    paginationStore.setTotalData(categoryTasks.value.length);
});

function getStatusColor(statusId) {
    switch (statusId) {
        case 1:
            return 'bg-gray-500'
            break;
        case 2:
            return 'bg-blue-600'
            break;
        case 3:
            return 'bg-green-500'
            break;
        default:
            break;
    }
}


function getPriorityColor(priorityId) {
    switch (priorityId) {
        case 1:
            return 'text-blue-400'
            break;
        case 2:
            return 'text-orange-400'
            break;
        case 3:
            return 'text-red-500'
            break;
        default:
            break;
    }
}

</script>
