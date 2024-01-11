import './assets/styles/main.scss';
import { createPinia } from 'pinia';
import { type Component, createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App as Component);
app.use(createPinia());
app.use(router);
app.mount('#app');
