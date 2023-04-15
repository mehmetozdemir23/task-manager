<template>
    <div class="absolute top-0 h-full">
        <div @scroll="handleScroll"
            class="relative p-8 flex space-x-4 w-max h-full">
            <div v-if="tasksByStatuses.size" class="flex space-x-4">
                <div v-for="[status, tasks] of tasksByStatuses" :key="status" class="flex flex-col space-y-6"
                    @drop="event => onDrop(event, status)" @dragenter.prevent @dragover.prevent>
                    <h1 class="text-white text-lg capitalize font-bold">{{ status.name }}</h1>
                    <ul v-if="tasks.length" class="flex flex-col space-y-4 pb-4">
                        <li v-for="task in tasks" :key="task.id">
                            <TaskCard :task="task" @dragstart="event => startDrag(event, task)" />
                        </li>
                    </ul>
                    <div v-else class="w-72 sm:max-w-md">

                    </div>
                </div>
            </div>
            <router-link :to="{ name: 'task.create' }" :class="{ 'hidden': isScrollingDown }"
                class="fixed right-8 bottom-28 sm:bottom-8 z-50 transition-transform duration-500 px-4 py-2 flex items-center rounded-lg bg-blue-500 shadow-md hover:bg-blue-700 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white mr-2">
                    <path d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span class="text-white font-bold mb-1">New task</span>
            </router-link>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "@/stores/tasks";
import TaskCard from "../components/TaskCard.vue";
import { useStatusStore } from "../stores/statuses";

const taskStore = useTaskStore();
const tasks = computed(() => taskStore.collection);

const statusStore = useStatusStore();
const statuses = computed(() => statusStore.collection);

const tasksByStatuses = computed(() => {
    const map = new Map();
    if (statuses.value.length && tasks.value.length) {
        statuses.value.forEach(status => {
            map.set(
                status,
                taskStore.getTasksByStatus(status.id)
            );
        });
    }
    return map;
});

const previousScrollPos = ref(0);
const isScrollingDown = ref(false);

onMounted(async () => {
    await statusStore.fill();
    await taskStore.fill();
});

function handleScroll(e) {
    const currentScrollPos = e.target.scrollTop;
    isScrollingDown.value = currentScrollPos > previousScrollPos.value;
    previousScrollPos.value = currentScrollPos;
}

function startDrag(event, item) {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('itemID', item.id);
}

function onDrop(event, status) {
    const itemID = event.dataTransfer.getData('itemID');
    const task = tasks.value.find(task => task.id == itemID);
    task.status.id = status.id;
}
</script>
