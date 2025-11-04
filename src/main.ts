import { createApp } from 'vue'
import App from './App.vue'
import './style.css';
import { createMemoryHistory, createRouter } from 'vue-router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Register from './pages/register-page.vue';
import Login from './pages/login-page.vue';
import CustomizeProfile from './pages/customize-profile.vue';
import FindChat from '@/pages/find-chat.vue'
import Chats from './pages/chats.vue';

const routes = [
    { path: '/register', component: Register },
    { path: '/find-chat', component: FindChat },
    { path: '/profile', component: CustomizeProfile },
    { path: '/login', component: Login },
    { path: '/chats', component: Chats },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

createApp(App)
    .use(Toast)
    .use(router)
    .mount('#app')
