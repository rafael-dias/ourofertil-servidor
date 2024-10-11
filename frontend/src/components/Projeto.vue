<template>
  <div>

    <div class="container">
      <h3 class="mb-5">Estações de Abastecimento </h3>

      <div class="row">
        <div class="col-3 mb-3" v-for="estacao in store.estacoes">
          <div class="card" style="width: 18rem;">
            <h6 class="card-header">
              Estação {{estacao.estacao}}
            </h6>

            <div class="card-body">

              <BarChart :volume="estacao.ultimo_registro.volume_tanque" :capaciade="200000"
                :cor="status[estacao.ultimo_registro.status].cor" />
              <p class=" text-center"> <span class="badge text-bg-success"
                  :class="status[estacao.ultimo_registro.status].class">{{
                  status[estacao.ultimo_registro.status].nome}}</span></p>
              <p class=" text-center mt-3 text-body-secondary">ultima atualização:  {{formatDate(estacao.ultimo_registro.data)}}</p>
              <div class="mt-3 pt-3 mb-0  pb-0 card-footer text-body-secondary d-flex">
                <div class="ms-auto me-0  btn btn-outline-secondary card-link" @click="Detalhes(estacao)">Detalhes
                </div>
                <br>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from './BarChart.vue'
import api from "../services/api.js";
import { store } from '../store.js'
import MixinGeral from "../mixins/mixin_geral.js"

export default {
  name: 'Projeto',
  components: { BarChart },
  mixins: [MixinGeral],
  data() {
    return {
      store,
      dados_enviar:'',
      status:[
        { nome: 'nível normal', class: 'text-bg-success', cor:'#198754'},
        { nome: 'nível baixo', class: 'text-bg-danger', cor:'#dc3545'},
        { nome: 'nível médio', class: 'text-bg-warning', cor: '#ffc107'},
      ],
      estacoes:[
        {nome:'Vacaria', volume:78000, status: 1},
          {nome:'Clemente Argolo', volume:122000, status: 0},
          {nome:'Campos Novos', volume:45000, status: 2},
          {nome:'Cruz Alta', volume:150000, status: 0},
          {nome:'Fortaleza do Valos', volume:110000, status: 0},
        { nome:'Não-Me-Toque', volume:120000, status: 0},
          {nome:'Palmeira das Missões', volume:160000, status: 0},
          {nome:'Vitória das Missões', volume:125000, status: 0},
          // {nome:'Caxias do Sul', volume:5000},
      ]

    };
  },
  created() {
    if (this.store.autenticacao == undefined) {
      this.$router.push("/");
    } else {
      // this.CarregarAlunos();

      this.FetchRegistros()
      //  this.$refs.entrada.$el.focus()
    }
   

  },
  methods: {

    // FetchRegistros(){
    //   let self = this
    //   let token = localStorage.getItem('token');
    //   const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    //   };
    //   api.get("/registros", config).then((response)=>{
    //     self.store.estacoes = self.AgruparPorEstacao(response.data.registros)
    //     self.store.registros = response.data.registros
    //   })
    // },
   
    // // Função para agrupar por estação
    //  AgruparPorEstacao(array) {
    //    return array.reduce((acc, obj) => {
    //      const station = obj.estacao;
    //      if (!acc[station]) {
    //        acc[station] = {
    //          estacao: station,
    //          registros: [],
    //          ultimo_registro: null
    //        };
    //      }
    //      acc[station].registros.push(obj);
    //      // Atualiza o último registro se a data for mais recente
    //      if (!acc[station].ultimo_registro || new Date(obj.data) > new Date(acc[station].ultimo_registro.data)) {
    //       if(obj.volume_tanque <= 20000){
    //         obj.status = 1
    //       }else{
    //         obj.status = 0

    //       }
    //        acc[station].ultimo_registro = obj;
    //      }
    //      return acc;
    //    }, {});
    // },
    // formatDate(dateString) {
    //   const date = new Date(dateString);
    //   const day = String(date.getDate()).padStart(2, '0');
    //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    //   const year = date.getFullYear();
    //   const hours = String(date.getHours()).padStart(2, '0');
    //   const minutes = String(date.getMinutes()).padStart(2, '0');

    //   return `${day}/${month}/${year} - ${hours}:${minutes}`;
    // },
     Detalhes(ele) {
      this.store.estacao = ele.estacao
      this.$router.push('/registro')
    },




  },
};
</script>

<style scoped>

</style>