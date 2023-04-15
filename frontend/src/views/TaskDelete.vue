<template>
    <div class="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
        <DeleteModal model="task" @deleted="deleteTask"/>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useTaskStore } from '@/stores/tasks';
import { useRouter } from 'vue-router';
import DeleteModal from '../components/DeleteModal.vue';

const { id } = defineProps({
    id: {
        type: [Number, String],
        required: true
    }
});

const router = useRouter();

const taskStore = useTaskStore();
const task = computed(() => taskStore.getInstanceById(id));

async function deleteTask() {
    await taskStore.delete(task.value);
    close();
}

function close(){
    router.push({name:'task.index'});
}
</script>
