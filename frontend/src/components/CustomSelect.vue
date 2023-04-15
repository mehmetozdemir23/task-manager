<template>
    <div class="relative flex flex-col space-y-2">
        <h1 v-if="label" class="text-sm font-medium text-white">
            {{ label }}
        </h1>
        <button @click="toggleDropdown"
            class="w-full sm:w-36 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center bg-gray-700 hover:bg-gray-600"
            type="button">
            {{ selectedItem?.name }}
            <svg class="w-4 h-4 ml-auto fill-gray-500 dark:fill-gray-200" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <!-- Dropdown menu -->
        <div v-if="dropdownOpen"
            class="w-full absolute -bottom-2 cursor-pointer transform translate-y-full z-10 divide-y divide-gray-100 rounded-lg shadow bg-gray-700">
            <ul class="py-2 text-sm text-gray-200">
                <li v-for="item in props.items" :key="item.id"
                    class="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                    @click="onItemSelect(item)">
                    {{ item.name }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
    modelValue: {
        type: Object
    },
    items: {
        type: Array,
        required: true
    },
    label: {
        type: String,
        default: ''
    }
});


const emit = defineEmits(['update:modelValue']);

const selectedItem = computed(() => {
    return props.items.find(item => item.id == props.modelValue?.id) ?? null;
});

const dropdownOpen = ref(false);

function toggleDropdown() {
    dropdownOpen.value = !dropdownOpen.value;
}

function onItemSelect(item) {
    emit('update:modelValue', item);
    toggleDropdown();
}
</script>
