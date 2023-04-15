<template>
    <router-link :to="link" :class="bgColor" class="inline-flex flex-col items-center justify-center w-full h-full group">
        <slot name="icon" />
        <span class="mt-1 text-xs text-gray-100 font-medium">{{
            label }}</span>
    </router-link>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const { label, link } = defineProps({
    label: {
        type: String,
        required: true
    },
    link: {
        type: Object,
        required: true
    }
})
const route = useRoute();

const bgColor = computed(
    () =>
        route.path.startsWith(link.path) ?
            'bg-blue-400' : 'bg-gray-800'
);

</script>
