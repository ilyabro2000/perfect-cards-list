import { createApp, reactive } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.$editorData = reactive({
  value: null,
});

app.use(createPinia());

app.mount('#app');
