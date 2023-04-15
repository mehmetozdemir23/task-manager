<template>
    <div class="relative p-4 sm:p-0 sm:max-w-md md:h-auto">
        <div class="relative rounded-lg shadow bg-gray-800">
            <button type="button"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
                @click="goBack">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 text-center">
                <svg class="mx-auto mb-4 w-14 h-14 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="mb-5 text-md sm:text-lg font-normal text-gray-400">Are you sure you want
                    to delete
                    this {{ model }} ?</h3>
                <button type="button"
                    class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    @click="deleteInstance">
                    Yes, I'm sure
                </button>
                <button type="button" @click="goBack"
                    class="focus:ring-4 focus:outline-none rounded-lg text-sm font-medium px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">No,
                    cancel</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

const { model } = defineProps({
    model: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['deleted']);

const router = useRouter();

function deleteInstance(){
    emit('deleted');
}

function goBack(){
    router.back();
}

</script>
