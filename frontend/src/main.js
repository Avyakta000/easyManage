// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/tailwind.css' 
import router from './router'; 
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';


const app = createApp(App);

app.use(Toast, {
    position: POSITION.TOP_RIGHT, 
    timeout: 3000, 
  });

const pinia = createPinia();
app.use(pinia);
app.use(router); 
app.mount('#app');

