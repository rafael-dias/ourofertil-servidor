import { createApp } from 'vue';
import './style.css';
import router from './router';
import App from './App.vue';
// import {store} from './store'


const app = createApp(App);


import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;
import 'bootstrap/dist/css/bootstrap.css';



// routes.beforeEach((to, from, next) => {
//     const token = localStorage.getItem('token');
//     if (to.matched.some(record => record.meta.requiresAuth) && !token) {
//         next('/login');
//     } else {
//         next();
//     }
// });

// app.provide('store', store)
// app.use(
//     createRouter({
//         history: createMemoryHistory(),
//         routes,
//     })
// );



app.use(router).mount('#app')



// app.mount('#app')
