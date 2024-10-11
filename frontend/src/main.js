import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
// import {store} from './store'

import { createMemoryHistory, createRouter } from 'vue-router';

const app = createApp(App);


import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;
import 'bootstrap/dist/css/bootstrap.css';


import Projeto from './components/Projeto.vue'
import Login from './components/Login.vue'
// import Clientes from './components/Clientes.vue'
import Registro from './components/Registro.vue'
// import Graficos from './components/Graficos.vue'
// import Websocket from './components/Websocket.vue'

const routes = [
    { path: '/', component: Login },
    { path: '/login',  component: Login },
    { path: '/projeto', name: 'tanques', component: Projeto },
    { path: '/registro', name: 'registros', component: Registro },
    // { path: '/clientes', component: Clientes },
    // { path: '/graficos', component: Graficos },
    // { path: '/trocar_dados', component: Websocket },
]

// app.provide('store', store)
app.use(
    createRouter({
        history: createMemoryHistory(),
        routes,
    })
);
// 



app.mount('#app')
