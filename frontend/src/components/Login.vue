<template>
  <div class="login-form">
    <h2 class="text-center">Ourofertil</h2>
    <form id="form">
      <div class="mb-3">
        <label for="usuario" class="form-label">Usuario</label>
        <input type="text" class="form-control" id="usuario" v-model="usuario" placeholder="Seu usuário">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Senha</label>
        <input type="password" class="form-control" id="password" v-model="senha" placeholder="Senha">
      </div>
      <!-- <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="remember">
                <label class="form-check-label" for="remember">Lembrar-me</label>
            </div> -->
      <div @click="Login" class="btn btn-primary w-100">Entrar</div>
    </form>
  </div>

</template>

<script>
import api from "../services/api.js";
import { store } from '../store.js'

export default {
  name: 'Login',
  
  data() {
    return {
      store,
     usuario:'',
     senha:'' 
    }
  },
  created() {
    // if (this.store.autenticacao == undefined) {
    //   this.$router.push("/");
    // } else {
      // this.CarregarAlunos();

  //    this.FetchRegistros()
      //  this.$refs.entrada.$el.focus()
    // }
   

  },
  methods: {

    Login(){
      let self = this
      let usuario = this.usuario
      let senha = this.senha
      
      
      api.post("/login", {usuario, senha}).then((response)=>{
        const data = response.data;
        if (response.status == 200) {
          self.store.autenticacao = data.token
          localStorage.setItem('token', data.token);
          self.$router.push('/projeto')
        } else {
          alert(data.message);
        }
      })
    },



  },
};
</script>

<style scoped>

        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f8f9fa;
        }
    
        .login-form {
          width: 100%;
          max-width: 400px;
          padding: 15px;
          margin: auto;
        }
</style>