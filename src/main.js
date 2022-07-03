import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'uno.css';
import '@unocss/reset/tailwind.css';
createApp(App).use(store).use(router).mount('#app');
