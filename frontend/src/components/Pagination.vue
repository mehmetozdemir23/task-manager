<template>
    <div class="fixed bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center mt-8">
        <!-- Help text -->
        <span class="text-md text-gray-300">
            Showing <span class="font-semibold text-white">{{ startIndex + 1 }}</span> to <span
                class="font-semibold text-white">{{ endIndex + 1 }}</span> of <span class="font-semibold text-white">{{
                    totalData }}</span> Tasks
        </span>
        <div class="inline-flex mt-2 xs:mt-0">
            <!-- Buttons -->
            <button type="button" @click="changePage(currentPage - 1)" :disabled="currentPage == 1"
                :class="currentPage == 1 ? disabledClass : activeClass"
                class="inline-flex items-center px-4 py-2 text-sm text-white font-medium rounded-l">
                <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                        clip-rule="evenodd"></path>
                </svg>
                Prev
            </button>
            <button type="button" @click="changePage(currentPage + 1)" :disabled="currentPage == pageCount"
                :class="currentPage == pageCount ? disabledClass : activeClass"
                class="inline-flex items-center px-4 py-2 text-sm text-white font-medium rounded-r">
                Next
                <svg aria-hidden="true" class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    </div>
</template>
<script setup>
import { ref,computed } from 'vue';
import { usePaginationStore } from '../stores/pagination';

const emit = defineEmits(['pageChanged']);

const paginationStore = usePaginationStore();

const totalData = computed(() => paginationStore.totalData);
const pageCount = computed(() => paginationStore.pageCount);

const currentPage = computed(() => paginationStore.currentPage);
const startIndex = computed(() => paginationStore.startIndex);
const endIndex = computed(() => paginationStore.endIndex);

const disabledClass = ref('bg-gray-600 cursor-not-allowed');
const activeClass = ref('bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-900 hover:text-white cursor-pointer');

const { changePage } = paginationStore;

</script>
