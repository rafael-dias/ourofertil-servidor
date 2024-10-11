<script setup>
import Projeto from './components/Projeto.vue'
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-dark mb-5" data-bs-theme="dark" v-if="store.autenticacao">
    <div class="container">
      <RouterLink class="navbar-brand" to="/projeto" href="#">Ourofertil</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/projeto">Tanques</RouterLink>
          </li>
          <!-- <li class="nav-item">
            <RouterLink class="nav-link" to="/clientes">Clientes</RouterLink>
          </li> -->
          <!-- <li class="nav-item">
            <RouterLink class="nav-link" to="/graficos">Graficos</RouterLink>
          </li>
          -->
        </ul>
        <div class="d-flex">
          <div class="btn btn-outline-secondary" @click="Sair">Sair</div>
        </div>

      </div>
    </div>
  </nav>
  <RouterView />
</template>
<script>
import { store } from './store.js'
export default {
  name:'App',
  data(){
    return{
      store

  }
}, methods:{
    Sair(){
    localStorage.removeItem("token");
    this.$router.push('/')
    }
}
}
</script>
<style scoped></style>
