import { createApp } from 'vue'
import App from './App.vue'
import './style.css';
import { createMemoryHistory, createRouter } from 'vue-router'

import Register from './pages/Register.vue';

const routes = [
    { path: '/register', component: Register },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

createApp(App)
    .use(router)
    .mount('#app')
