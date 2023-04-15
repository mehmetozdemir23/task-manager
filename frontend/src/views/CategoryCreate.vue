<template>
    <div v-if="category"
        class="z-50 fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="relative sm:w-full max-w-2xl px-4">
            <!-- Modal content -->
            <div class="w-screen sm:w-full max-w-lg mx-auto relative rounded-lg shadow bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-5 border-b rounded-t border-gray-700">
                    <h3 class="text-xl font-semibold text-white">
                        New category
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
                        <div class="flex flex-col space-y-2">
                            <FormInput id="name" label="Name" :required="true" v-model="category.name"
                                @click="resetError('name')" />
                            <p v-text="errors.name" class="text-xs text-red-500 font-bold"></p>
                        </div>
                    </form>
                </div>
                <!-- Modal footer -->
                <div class="flex justify-end space-x-4 p-6 border-t rounded-b border-gray-700">
                    <button
                        class="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-700 hover:bg-gray-600"
                        type="button" @click="resetCategory">Reset</button>
                    <button
                        class="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700"
                        type="button" @click="addCategory">Create</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useCategoryStore } from '../stores/categories';
import { useMessageStore } from '../stores/messages';
import FormInput from '../components/FormInput.vue';

const router = useRouter();

const category = ref({
    name: ''
});

const categoryStore = useCategoryStore();
const errors = computed(() => categoryStore.errors);

const authStore = useAuthStore();
const user = computed(() => authStore.user);

function close() {
    for (const field of Object.keys(errors.value))
        resetError(field);
    resetCategory();
    router.push({ name: 'category.index' });
}

function resetCategory() {
    category.value = {
        name: ''
    };
}

function resetError(field) {
    delete errors.value[field];
}

async function addCategory() {
    const categoryData = category.value;
    const payload = {
        name: categoryData.name,
        user_id: user.value.id
    };

    await categoryStore.add(payload);
    if (Object.keys(errors.value).length < 1) {
        router.push({ name: 'category.index' });
        const { setMessage } = useMessageStore();
        setMessage({ type: 'success', content: 'Category has been successfully created!' });
    }

}
</script>
