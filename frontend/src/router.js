import { createRouter, createWebHistory } from 'vue-router';
import Estacoes from './components/Estacoes.vue'
import Login from './components/Login.vue'
import Registro from './components/Registro.vue'

const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/estacoes', name: 'estacoes', component: Estacoes, meta: { requiresAuth: true } },
    { path: '/registros', name: 'registros', component: Registro, meta: { requiresAuth: true } },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        next('/login'); // Redireciona para a página de login se não houver token
    } else {
        next(); // Permite a navegação
    }
});

export default router;



