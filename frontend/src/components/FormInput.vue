<template>
    <div class="col-span-6 sm:col-span-3">
        <label v-if="label" :for="id" class="block mb-2 text-sm font-medium text-white">{{ label }}</label>
        <input :type="type" :value="modelValue" :id="id"
            class="autofill:!bg-none shadow-sm border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            :placeholder="placeholder" :required="required" @input="emit('update:modelValue',$event.target.value)"
            :disabled="disabled"
            @focus="emit('focused')">
    </div>
</template>
<script setup>
const { modelValue, id, type, required, placeholder, disabled } = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'text'
    },
    required: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: ''
    },
    label: {
        type: String,
    },
    disabled:{
        type:Boolean,
        default:false
    }
})
const emit = defineEmits(['update:modelValue','focused']);
</script>
