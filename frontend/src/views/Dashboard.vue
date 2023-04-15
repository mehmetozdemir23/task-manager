<template>
    <div class="sm:absolute sm:top-0 w-full h-full overflow-hidden">
        <div class="flex flex-col px-8 pt-8">
            <div class="flex flex-col space-y-4">
                <h1 class="text-white text-lg font-semibold">Today's Must-Dos</h1>
                <ul v-if="tasksToCompleteToday.length"
                    class="w-full flex rounded-lg bg-transparent space-x-4 overflow-x-scroll">
                    <li v-for="task in tasksToCompleteToday" :key="task.id">
                        <TaskSmallCard :task="task" />
                    </li>
                </ul>
                <div v-else class="w-max py-4 flex items-center text-xs font-medium px-4 border-l-4 text-white border-gray-400 bg-gray-600">
                    Nothing to do for today...
                </div>
            </div>
        </div>
        <div v-if="mostCompletedCategories.length" class="flex flex-col px-8 pt-8">
            <div class="flex flex-col space-y-4">
                <h1 class="text-white text-lg font-semibold">So far, so good ...</h1>
                <ul class="w-full flex rounded-lg space-x-4 overflow-x-scroll">
                    <li v-for="category in mostCompletedCategories" :key="category.id">
                        <CategorySmallCard :category="category" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted } from 'vue';
import { useTaskStore } from '@/stores/tasks';
import { useCategoryStore } from '@/stores/categories'
import TaskSmallCard from '../components/TaskSmallCard.vue';
import CategorySmallCard from '../components/CategorySmallCard.vue';

const taskStore = useTaskStore();
const categoryStore = useCategoryStore();

const mostCompletedCategories = computed(() =>
    taskStore.collection.length && categoryStore.collection.length
        ? categoryStore.getMostCompletedCategories(taskStore).slice(0, 3)
        : []
);

const tasksToCompleteToday = computed(() =>
    taskStore.collection.length
        ? taskStore.tasksToCompleteToday
            .sort((a, b) => {
                const dueDateA = new Date(a.due_date);
                const dueDateB = new Date(b.due_date);
                return dueDateA.getTime() - dueDateB.getTime();
            })
        : []

);

onMounted(async () => {
    await taskStore.fill();
    await categoryStore.fill();
});
</script>
