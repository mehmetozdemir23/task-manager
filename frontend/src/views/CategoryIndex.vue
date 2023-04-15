<template>
    <div class="w-full flex flex-col absolute top-0 left-0 p-8 bg-gray-700 min-h-screen h-full">
        <div class="flex justify-between mb-16">
            <h1 class="flex items-center space-x-2 font-semibold text-white text-lg">
                Categories
            </h1>
            <router-link :to="{ name: 'category.create' }"
                class="w-max block px-3 h-12 flex items-center rounded-lg bg-blue-500 shadow-md hover:bg-blue-600 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 text-white mr-2">
                    <path d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span class="block w-max text-white text-sm font-bold">New category</span>
            </router-link>
        </div>
        <div class="w-full flex flex-col lg:flex-row lg:justify-between  mb-8 bg-transparent rounded-lg">
            <div class="w-full flex flex-col justify-between sm:flex-row">
                <div class="relative w-full items-center md:max-w-md mb-2 sm:mr-2 sm:mb-0 shadow-md">
                    <input type="text" id="category-search" v-model="searchText"
                        class="text-sm shadow rounded-lg block w-full h-12 pl-4 py-2.5 bg-gray-800 placeholder-gray-400 text-white focus:outline-none focus:border-blue-500"
                        placeholder="Search for categories">
                    <div class="absolute inset-y-0 right-4 flex justify-center items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                </div>
                <div class="relative">
                    <select v-model="selectedSortParam"
                        class="h-12 flex items-center text-sm rounded-lg block w-full md:w-max px-4 pr-8 shadow appearance-none bg-gray-800 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                        <option v-for="param in sortParams" :value="param" :selected="param.name == selectedSortParam.name">
                            {{
                                param.name }}</option>
                    </select>
                    <div
                        class="pointer-events-none absolute inset-y-0 right-2 top-1/2 transform -translate-y-1/2 flex items-center dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            class="w-5 h-5 fill-white">
                            <path fill-rule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-1 overflow-y-scroll mb-20 sm:mb-0">
            <ul v-if="categories.length" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <li v-for="category in categories" :key="category.id">
                    <CategoryCard :category="category" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '@/stores/tasks';
import { useCategoryStore } from '@/stores/categories';
import CategoryCard from '../components/CategoryCard.vue';


const taskStore = useTaskStore();

const categoryStore = useCategoryStore();
const categories = computed(() => {
    let collection = categoryStore.collection;

    if (searchText.value)
        collection = categoryStore.collection.filter(
            category => category.name.includes(searchText.value)
        );

    if (selectedSortParam.value)
        collection = collection.sort(
            (a, b) => selectedSortParam.value.compareFn(a, b, taskStore)
        );

    return collection;
}
);

// const categoryTasks = computed(() => {
//     let map = new Map();
//     if (categories.value.length && taskStore.collection.length)
//         categories.value.forEach(
//             category => {
//                 const count = categoryStore.getAllTasks(category.id, taskStore).length;
//                 if (count) map.set(category, count);
//             }
//         )
//     //searching
//     if (searchText.value)
//         for (let k of map.keys()) {
//             if (!k.name.includes(searchText.value))
//                 map.delete(k);
//         }
//     //sorting
//     if (selectedSortParam.value)
//         map = new Map([...map].sort((a, b) => selectedSortParam.value.compareFn(a[0], b[0], taskStore)));


//     return map;

// });

const searchText = ref('');

const sortParams = computed(() => categoryStore.sortParams);

const selectedSortParam = ref(sortParams.value[0]);

onMounted(async () => {
    await taskStore.fill();
    await categoryStore.fill();
});
</script> 