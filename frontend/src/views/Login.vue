<template>
    <main class="w-full h-full flex items-start justify-center sm:items-center bg-gray-900">
        <section class="w-full sm:w-max my-16 sm:my-0 bg-inherit sm:rounded-lg">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-inherit border-gray-700">
                    <div class="flex flex-col p-6">
                        <h1 class="mb-8 text-lg font-semibold leading-tight tracking-tight md:text-2xl text-white">
                            Welcome to Task Manager !
                        </h1>
                        <form @submit.prevent="handleLogin">
                            <FormInput v-model="credentials.email" label="Email" id="email" type="email" :required="true"
                                @click="resetError('email')" />
                            <FormInput v-model="credentials.password" label="Password" id="password" type="password"
                                :required="true" @click="resetError('email')" class="mt-6" />
                            <button type="submit"
                                class="mt-8 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign
                                in</button>
                        </form>
                        <ul v-if="Object.keys(errors).length" class="w-56">
                            <li v-for="error in errors" :key="error" class="flex items-center space-x-2">
                                <div v-if="error" class="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="flex-shrink-0 w-8 text-red-500">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                    <span class="text-red-500 text-xs font-semibold">
                                        {{ error }}
                                    </span>
                                </div>
                            </li>
                        </ul>
                        <div class="w-full mt-8 rounded-lg bg-gray-800 text-white p-4">
                            <h3 class="mb-4 text-md">test credentials :</h3>
                            <p><span class="text-sm mr-2">email:</span><span class="font-semibold text-md">test@example.com</span></p>
                            <p><span class="text-sm mr-2">password:</span><span class="font-semibold text-md">test_password</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import FormInput from '../components/FormInput.vue';

const authStore = useAuthStore();
const { login } = authStore;
const errors = computed(() => authStore.errors);
const { resetError, resetErrors } = authStore;

const credentials = ref({
    email: 'test@example.com',
    password: 'test_password'
});

const router = useRouter();

async function handleLogin() {
    await login(credentials.value);
    if (authStore.isAuthenticated) {
        resetErrors();
        router.push({ name: 'dashboard' });
    }
}

</script>
