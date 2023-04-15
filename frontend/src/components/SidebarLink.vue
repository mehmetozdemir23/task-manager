<template>
    <li>
        <router-link :to="link" :class="bgColor" class="link mb-4 flex flex-col rounded-lg items-center space-y-1 p-4">
            <slot name="icon" />
            <div class="font-bold text-xs text-white">{{ label }}</div>
        </router-link>
    </li>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const { label, link } = defineProps({
    label: { type: String, required: true },
    link: { type: Object, required: true }
})

const route = useRoute();

const bgColor = computed(
    () =>
        route.path.startsWith(link.path) ?
            'bg-blue-400' : 'bg-gray-800'
);

</script>
<style scoped>
.router-link-active {
    transition: all 0.3s ease-in-out;
}
</style>