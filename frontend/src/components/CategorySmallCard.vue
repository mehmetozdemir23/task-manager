<template>
    <router-link :to="{ name: 'category.show', params: { id: category.id } }"
        class="block w-max bg-gray-800 shadow rounded-md py-3 px-4 hover:shadow-md transition-shadow duration-300">
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-md font-semibold text-white">{{ category.name }}</h2>
        </div>
        <div class="h-2 rounded-full bg-gray-700 overflow-hidden">
            <div class="h-full bg-indigo-500 text-white font-semibold text-xxs flex items-center justify-center"
                :style="`width: ${completionPercentage}%;`"></div>
        </div>
        <div class="flex items-center justify-between space-x-8 mt-1 text-gray-300 text-sm font-medium">
            <div>{{ completionRate }} Completed</div>
            <div class="h-7 flex items-center text-white font-medium text-sm rounded-full">
                {{ completionPercentage }} %
            </div>
        </div>
    </router-link>
</template>
  
<script setup>
import { computed } from 'vue';
import { useCategoryStore } from '../stores/categories';
import { useTaskStore } from '../stores/tasks';

const { category } = defineProps({
    category: {
        type: Object,
        required: true
    }
});

const categoryStore = useCategoryStore();
const taskStore = useTaskStore();

const categoryAllTasks = computed(
    () => categoryStore.getAllTasks(category.id, taskStore)
);

const categoryCompletedTasksCount = computed(
    () => categoryStore.getCompletedTasks(category.id, taskStore)
)

const completionRate = computed(() =>
    `${categoryCompletedTasksCount.value.length}/${categoryAllTasks.value.length}`
);

const completionPercentage = computed(
    () => Math.ceil(
        categoryCompletedTasksCount.value.length / categoryAllTasks.value.length
        * 100
    )
);
</script>
  