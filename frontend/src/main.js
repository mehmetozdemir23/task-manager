import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { BasePlugin } from './stores/BasePlugin';

import App from './App.vue';
import router from './router';

import './index.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
pinia.use(BasePlugin);

app.use(router);

app.mount('#app');
