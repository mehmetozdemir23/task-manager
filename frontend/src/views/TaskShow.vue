<template>
    <div v-if="task && categories.length && priorities.length"
        class="z-50 w-full fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="relative max-w-2xl px-4">
            <!-- Modal content -->
            <div class="w-screen sm:w-full sm:max-w-lg mx-auto relative rounded-lg shadow bg-gray-800">
                <!-- Modal header -->
                <div class="w-full flex justify-between p-5 border-b rounded-t border-gray-700">
                    <h3 class="text-xl font-semibold text-white">
                        Edit task
                    </h3>
                    <div class="flex space-x-4 items-start">
                        <CustomSelect v-if="statuses.length" :items="statuses" v-model="task.status" />
                        <button type="button"
                            class="w-8 h-8 flex justify-center items-center text-gray-400 bg-transparent rounded-lg text-sm ml-auto inline-flex items-center hover:bg-gray-700 hover:text-white"
                            @click="close">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <!-- Modal body -->
                <div class="w-full p-6">
                    <div class="w-full flex flex-col space-y-8">
                        <div class="flex flex-col">
                            <FormInput id="title" label="Title" :required=true v-model="task.title"
                                @click="resetError('title')" />
                            <p class="text-red-500 font-bold text-sm mt-1" v-text="errors.title"></p>
                        </div>
                        <div>
                            <label for="description" class="block mb-2 text-sm font-medium text-white">Description</label>
                            <textarea id="description" rows="4" v-model="task.description"
                                class="block p-2.5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Write your thoughts here..." @click="resetError('description')"></textarea>
                            <p class="text-red-500 font-bold text-sm mt-1" v-text="errors.description"></p>
                        </div>
                        <div class="w-full flex flex-col sm:space-x-4 space-y-4 sm:space-y-0 sm:flex-row ">
                            <CustomSelect :items="categories" label="Category"
                                v-model="task.category" />
                            <CustomSelect :items="priorities" label="Priority"
                                v-model="task.priority" />
                            <div>
                                <label for="date" class="w-full block mb-2 text-sm font-medium text-white">Due
                                    date</label>
                                <Datepicker id="date" v-model="task.due_date"
                                    :disabled="isOverdue(task.due_date) || taskStore.isCompleted(task)" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Modal footer -->
                <div class="flex justify-between space-x-4 p-6 border-t rounded-b border-gray-700">
                    <router-link :to="{ name: 'task.delete', params: { id: task.id } }"
                        class="flex items-center px-3 py-1.5 space-x-2 group text-red-500 border-2 border-red-600 hover:bg-red-500 hover:text-gray-800 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            class="h-5 fill-red-500 group-hover:fill-gray-700">
                            <path fill-rule="evenodd"
                                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                clip-rule="evenodd" />
                        </svg>
                        <span>Delete</span>
                    </router-link>
                    <div class="flex space-x-4">
                        <button
                            class="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-700 hover:bg-gray-600"
                            type="button" @click="resetTask">Reset</button>
                        <button
                            class="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700"
                            type="button" @click="updateTask">Save all</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/tasks';
import { usePriorityStore } from '@/stores/priorities';
import { useCategoryStore } from '@/stores/categories';
import { useStatusStore } from '@/stores/statuses';
import { useMessageStore } from '../stores/messages';
import { isOverdue } from '../services/date';

import CustomSelect from '../components/CustomSelect.vue';
import FormInput from '../components/FormInput.vue';
import Datepicker from '../components/Datepicker.vue';

const { id } = defineProps({
    id: {
        type: [Number, String],
        required: true
    }
});

const router = useRouter();

const task = ref(null);
let originalTask = {};
const taskStore = useTaskStore();

const priorityStore = usePriorityStore();
const priorities = computed(() => priorityStore.collection);

const categoryStore = useCategoryStore();
const categories = computed(() => categoryStore.collection);

const statusStore = useStatusStore();
const statuses = computed(() => statusStore.collection);

const errors = computed(() => taskStore.errors);

onMounted(async () => {
    await statusStore.fill();
    await priorityStore.fill();
    await categoryStore.fill();
    await taskStore.fill();

    task.value = taskStore.getInstanceById(id) ?? null;
    originalTask = { ...task.value };
});

function close() {
    resetTask();
    router.back();
}

function resetTask() {
    Object.assign(task.value, originalTask);
}

function resetError(field) {
    delete errors.value[field];
}

async function updateTask() {
    const taskData = task.value;
    const payload = {
        id: taskData.id,
        title: taskData.title,
        description: taskData.description,
        due_date: taskData.due_date,
        status_id: taskData.status.id,
        priority_id: taskData.priority.id,
        category_id: taskData.category.id,
    };

    await taskStore.update(payload);
    if (Object.keys(errors.value).length < 1) {
        router.back();
        const { setMessage } = useMessageStore();
        setMessage({ type: 'success', content: 'Task has been successfully updated!' });
    }

}
</script>

