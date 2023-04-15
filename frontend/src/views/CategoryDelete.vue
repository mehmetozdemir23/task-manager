<template>
    <div class="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
        <DeleteModal model="category" @deleted="deleteCategory" />
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useCategoryStore } from '@/stores/categories';
import { useRouter } from 'vue-router';
import { useMessageStore } from '../stores/messages';
import DeleteModal from '../components/DeleteModal.vue';

const { id } = defineProps({
    id: {
        type: [Number, String],
        required: true
    }
});

const router = useRouter();

const categoryStore = useCategoryStore();
const category = computed(() => categoryStore.getInstanceById(id));

async function deleteCategory() {
    await categoryStore.delete(category.value);
    const { setMessage } = useMessageStore();
        setMessage({ type: 'success', content: 'Category has been successfully deleted!' });
    close();
}

function close() {
    router.push({ name: 'category.index' });
}
</script>

