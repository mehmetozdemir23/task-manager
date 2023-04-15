<template>
    <router-link :to="link"
        class="group p-2 rounded-lg flex justify-center items-center hover:bg-gray-500">
        <slot name="icon" />
    </router-link>
</template>
<script setup>
const { link } = defineProps({
    link: {
        type: Object,
        required: true
    }
})

</script>
