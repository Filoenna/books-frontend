import { createRouter, createWebHistory } from 'vue-router'
import BooksHome from '../views/BooksHome.vue'

const routes = [
    {
        path: '/',
        name: 'BooksHome',
        component: BooksHome
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;