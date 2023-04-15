<template>
    <router-link :to="{ name: 'category.show', params: { id: category.id } }"
        class="w-full block bg-gray-800 shadow rounded-md p-4 hover:shadow-md hover:shadow-gray-900 transition-shadow duration-300">
        <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-white mb-2">{{ category.name }}</h2>
        </div>
        <div class="relative mt-8">
            <div class="h-2 rounded-full bg-gray-700 overflow-hidden">
                <div class="h-full bg-indigo-500 text-white font-semibold text-xxs flex items-center justify-center"
                    :style="`width: ${completionPercentage}%;`"></div>
            </div>
            <div class="flex items-center justify-between mt-2">
                <div class="text-gray-300 text-sm font-medium">
                    {{ completionRate }} Completed
                </div>
                <div class="h-7 flex items-center text-white font-medium text-sm rounded-full">
                    {{ completionPercentage }}%
                </div>
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
    },
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
    () => {
        if (categoryAllTasks.value.length == 0) return 0;
        return Math.ceil(
            categoryCompletedTasksCount.value.length / categoryAllTasks.value.length
            * 100
        )
    }
);
</script>
  