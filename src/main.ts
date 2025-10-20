import { createApp } from 'vue'
import App from './App.vue'
import './style.css';
import { createMemoryHistory, createRouter } from 'vue-router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Register from './pages/register-page.vue';
import Login from './pages/login-page.vue';
import CustomizeProfile from './pages/customize-profile.vue';

const routes = [
    { path: '/register', component: Register },
    { path: '/profile', component: CustomizeProfile },
    { path: '/login', component: Login },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

createApp(App)
    .use(Toast)
    .use(router)
    .mount('#app')
