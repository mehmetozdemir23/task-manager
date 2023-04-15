<template>
    <transition name="slide-down">
        <Toast v-if="Object.keys(message).length" :message="message" />
    </transition>
    <TheSidebar />
    <main class="relative w-full h-full bg-gray-700 overflow-scroll mb-20 sm:mb-20">
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
    <TheBottombar />
</template>
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMessageStore } from '../stores/messages';
import TheSidebar from '@/components/TheSidebar.vue';
import TheBottombar from '@/components/TheBottombar.vue';
import Toast from '../components/Toast.vue';

const { matched } = useRoute();
const Component = computed(() => matched[matched.length - 1].components.default);

const messageStore = useMessageStore();
const message = computed(() => messageStore.message);

</script>
<style scoped>
.fade-enter-active {
    animation: coming 0.4s;
    animation-delay: 0.2s;
    opacity: 0;
}

.fade-leave-active {
    animation: going 0.4s;
}

@keyframes going {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-10px);
        opacity: 0;
    }
}

@keyframes coming {
    from {
        transform: translateX(-10px);
        opacity: 0;
    }

    to {
        transform: translateX(0px);
        opacity: 1;
    }
}

.slide-down-enter-active {
    animation: coming-from-top 0.4s;
    animation-delay: 0.2s;
    opacity: 0;
}

.slide-down-leave-active {
    animation: going-to-top 0.4s;
}

@keyframes going-to-top {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(-10px);
        opacity: 0;
    }
}

@keyframes coming-from-top {
    from {
        transform: translateY(-10px);
        opacity: 0;
    }

    to {
        transform: translateY(0px);
        opacity: 1;
    }
}

.slide-down-enter-active {
    animation: coming-from-top 0.4s;
    animation-delay: 0.2s;
    opacity: 0;
}

.slide-down-leave-active {
    animation: going-to-top 0.4s;
}

@keyframes going-to-top {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(-10px);
        opacity: 0;
    }
}

@keyframes coming-from-top {
    from {
        transform: translateY(-10px);
        opacity: 0;
    }

    to {
        transform: translateY(0px);
        opacity: 1;
    }
}
</style>
