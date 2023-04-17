<template>
    <div v-if="task && categories.length && priorities.length"
        class="z-50 fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="relative max-w-2xl px-4">
            <!-- Modal content -->
            <div class="w-screen sm:w-full max-w-lg mx-auto relative rounded-lg shadow bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-5 border-b rounded-t border-gray-700">
                    <h3 class="text-xl font-semibold text-white">
                        New task
                    </h3>
                    <button type="button"
                        class="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-700 hover:text-white"
                        @click="close">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="w-full p-6">
                    <form>
                        <div class="w-full flex flex-col space-y-8">
                            <div class="flex flex-col space-y-2">
                                <FormInput id="title" label="Title" :required="true" v-model="task.title"
                                    placeholder="Enter your next big idea here !" @click="resetError('title')" />
                                <p v-text="errors.title" class="text-red-500 font-bold text-xs"></p>
                            </div>
                            <div class="flex flex-col space-y-2">
                                <div>
                                    <label for="description"
                                        class="block mb-2 text-sm font-medium text-white">Description</label>
                                    <textarea id="description" rows="4" v-model="task.description"
                                        class="block p-2.5 w-full text-sm rounded-lg border focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="What's your idea all about ?"
                                        @click="resetError('description')"></textarea>
                                </div>
                                <p v-text="errors.description" class="text-red-500 font-bold text-xs"></p>
                            </div>
                            <div class="w-full flex flex-col sm:space-x-4 space-y-4 sm:space-y-0 sm:flex-row">
                                <CustomSelect :items="categories" label="Category"
                                    v-model="task.category" />
                                <CustomSelect :items="priorities" label="Priority"
                                    v-model="task.priority" />
                                <div>
                                    <label for="date" class="w-full block mb-2 text-sm font-medium text-white">Due
                                        date</label>
                                    <Datepicker id="date" v-model="task.due_date" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- Modal footer -->
                <div class="flex justify-end space-x-4 p-6 border-t rounded-b border-gray-700">
                    <button
                        class="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-700 hover:bg-gray-600"
                        type="button" @click="resetTask">Reset</button>
                    <button
                        class="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700"
                        type="button" @click="addTask">Create</button>
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
import { useAuthStore } from '@/stores/auth';
import { useMessageStore } from '../stores/messages';

import CustomSelect from '../components/CustomSelect.vue';
import FormInput from '../components/FormInput.vue';
import Datepicker from '../components/Datepicker.vue';

const { categoryId } = defineProps({
    categoryId: {
        type: [String, Number]
    }
});

const router = useRouter();

const task = ref({
    title: '',
    description: '',
    due_date: new Date().toISOString().split('T')[0],
    priority: null,
    category: null,
});

const taskStore = useTaskStore();
const errors = computed(() => taskStore.errors);

const priorityStore = usePriorityStore();
const priorities = computed(() => priorityStore.collection);

const categoryStore = useCategoryStore();
const categories = computed(() => categoryStore.collection);

const authStore = useAuthStore();
const user = computed(() => authStore.user);


onMounted(async () => {
    await priorityStore.fill();
    await categoryStore.fill();

    const categoryIndex = categoryId ? categories.value.findIndex((category) => category.id == categoryId) : 0;
    task.value.category = categories.value[categoryIndex];
    task.value.priority = priorities.value[0];
});

function close() {
    for (const field of Object.keys(errors.value))
        resetError(field);
    resetTask();
    router.push({ name: 'task.index' });
}

function resetTask() {
    task.value = {
        title: '',
        description: '',
        due_date: new Date().toISOString().split('T')[0],
        priority: null,
        category: null
    };
    const categoryIndex = categoryId ? categories.value.findIndex((category) => category.id == categoryId) : 0;
    task.value.category = categories.value[categoryIndex];
    task.value.priority = priorities.value[0];
}

function resetError(field) {
    delete errors.value[field];
}

async function addTask() {
    const taskData = task.value;
    const payload = {
        id: taskData.id,
        title: taskData.title,
        description: taskData.description,
        due_date: taskData.due_date,
        status_id: 1,
        priority_id: taskData.priority.id,
        category_id: taskData.category.id,
        user_id: user.value.id
    };

    await taskStore.add(payload);
    if (Object.keys(errors.value).length < 1) {
        router.push({ name: 'task.index' });
        const { setMessage } = useMessageStore();
        setMessage({ type: 'success', content: 'Task has been successfully created!' });
    }

}
</script>
