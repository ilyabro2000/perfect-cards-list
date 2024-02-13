import { createApp, reactive } from 'vue';
import vClickOutside from 'click-outside-vue3';
import LazyComponent from 'v-lazy-component';
import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.$editorData = reactive({
  value: null,
});

app.use(LazyComponent);
app.use(vClickOutside);

app.mount('#app');
