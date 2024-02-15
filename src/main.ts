import { createApp, reactive } from 'vue';
import LazyComponent from 'v-lazy-component';
import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.$editorData = reactive({
  value: null,
});

app.use(LazyComponent);

app.mount('#app');
