<template>
    <input type="date" v-bind="$attrs" class="w-full sm:w-auto px-4 py-2.5 rounded-lg h-fit text-sm text-white bg-gray-700" :value="modelValue" @input="emit('update:modelValue', $event.target.value)">
</template>
<script setup>
const { modelValue } = defineProps({
    modelValue: {
        type: String,
        required: true
    },
});
const emit = defineEmits(['update:modelValue']);
</script>
