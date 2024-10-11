<script setup>
import Projeto from './components/Projeto.vue'
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-dark mb-5" data-bs-theme="dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/" href="#">Ourofertil</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/projeto">Tanques</RouterLink>
          </li>
          <!-- <li class="nav-item">
            <RouterLink class="nav-link" to="/clientes">Clientes</RouterLink>
          </li> -->
          <!-- <li class="nav-item">
            <RouterLink class="nav-link" to="/graficos">Graficos</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/trocar_dados">Trocar Dados</RouterLink>
          </li> -->

        </ul>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped></style>
