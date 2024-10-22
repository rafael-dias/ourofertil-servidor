<template>
  <div>

    <div class="container">

      <div class="row">
        <h3 class="mb-5">Registro da Estação: {{ store.estacao }} <button @click="Atualizar"
            class="btn bt-sm btn-outline-secondary" type="button">
            <span class="spinner-border spinner-border-sm" aria-hidden="true" v-show="loading"></span>
            <span role="status" v-text="loading ? 'Atualizando...': 'Atualizar'"></span>
          </button>
        </h3>


        <div class="row">

          <div class="col-12 col-xxl-3 mb-3 d-flex justify-content-center ">
            <div class="card" style="width: 18rem;">
              <h6 class="card-header">
                Estação {{ store.estacoes[store.estacao].estacao }}
              </h6>

              <div class="card-body">

                <BarChart :volume="store.estacoes[store.estacao].ultimo_registro.volume_tanque" :capaciade="200000"
                  :cor="status[store.estacoes[store.estacao].ultimo_registro.status].cor" />
                <p class=" text-center"> <span class="badge text-bg-success"
                    :class="status[store.estacoes[store.estacao].ultimo_registro.status].class">{{
                    status[store.estacoes[store.estacao].ultimo_registro.status].nome }}</span></p>
                <p class=" text-center mt-3 text-body-secondary">ultima atualização: {{
                  formatDate(store.estacoes[store.estacao].ultimo_registro.data) }}</p>
                <div class="mt-3 pt-3 mb-0  pb-0 card-footer text-body-secondary d-flex">
                  <!-- <RouterLink class="ms-auto me-0  btn btn-outline-secondary card-link" to="/registro">Detalhes
                  </RouterLink> -->
                  <br>

                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-xxl-9 ">
            <div class="col-12 mb-2">
              filtros:
              <span class="btn btn-sm me-2" :class="[filtro == 1 ? 'btn-success' : 'btn-outline-secondary']"
                @click="filtro = 1">fornecimento</span>
              <span class="btn btn-sm  me-2" :class="[filtro == 2 ? 'btn-success' : 'btn-outline-secondary']"
                @click="filtro = 2">recebimento</span>
              <span class="btn btn-sm me-2" :class="[filtro == 0 ? 'btn-success' : 'btn-outline-secondary']"
                @click="filtro = 0">geral</span>


            </div>
            <div class="table-responsive">

              <table class="table table-sm table-striped table-hover ">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col" v-show="filtro != 0">{{ titulo_filtro[filtro]}}</th>
                    <th scope="col" v-show="filtro != 0">CPF/CNPJ</th>
                    <th scope="col" v-show="filtro != 0">Documento Carga</th>
                    <th scope="col" v-show="filtro == 0">Volume Tanque</th>
                    <th scope="col" v-show="filtro == 2 || filtro == 0">Volume Recebido</th>
                    <th scope="col" v-show="filtro == 1 || filtro == 0">Volume Fornecido</th>
                    <th scope="col">Data</th>
                    <th scope="col">Evento</th>
                    <th scope="col" v-show="store.usuario?.tipo_usuario == 999">Excluir</th>
                    <th scope="col">Detalhes</th>
                  </tr>
                </thead>
                <!-- 
                  cliente,
                  nome_transportador,
                  cnpj,
                  placa,
                  telefone,
              doc_carga,
              volume_recebido,
              volume_venda,
              volume_carregado,
              volume_tanque,
              estacao,
              data:dataF,
              evento -->
                <tbody>
                  <tr v-for="(reg, i) in Registros">
                    <th scope="row">{{ i + 1 }}</th>
                    <td v-show="filtro == 1">{{ reg.cliente }}</td>
                    <td v-show="filtro == 2">{{ reg.nome_transportador }}</td>
                    <td v-show="filtro != 0">{{ reg.cnpj }}</td>
                    <td v-show="filtro != 0">{{ reg.doc_carga }}</td>
                    <td v-show="filtro == 0">{{ reg.volume_tanque }}</td>
                    <td v-show="filtro == 2 || filtro ==0">{{ reg.volume_recebido }}</td>
                    <td v-show="filtro == 1 || filtro == 0">{{ reg.volume_carregado }}</td>
                    <td>{{ formatDate(reg.data) }}</td>
                    <td><span class="badge " :class="reg.evento == 0 ? 'text-bg-success' : 'text-bg-secondary'">{{ reg.evento
                        == 0 ?'fornecimento':'recebimento' }}</span>
                    </td>
                    <td v-if="store.usuario.tipo_usuario == 999">
                      <div class="btn btn-sm btn-outline-danger " @click="Deletar(reg)">Excluir</div>
                    </td>
                    <td>
                      <div class="btn btn-sm btn-outline-secondary " @click="ModalDetalhes(reg)">Detalhes</div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                  <a class="page-link">Anterior</a>
                </li>
                <li class="page-item disabled"><a class="page-link" href="#">1</a></li>
                <li class="page-item disabled"><a class="page-link" href="#">2</a></li>
                <li class="page-item disabled"><a class="page-link" href="#">3</a></li>
                <li class="page-item disabled">
                  <a class="page-link" href="#">Próximo</a>
                </li>
              </ul>
            </nav>
            <span class="btn bt-sm btn-outline-secondary">Exportar
              Dados</span>
          </div>
        </div>
      </div>
      <div class="modal" tabindex="-1" id="modal-detalhe">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Detalhe do Registro</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- <pre>{{modal_detalhes}}</pre> -->
              <form>
                <div class="row">
                  <div class="col-md-12 mb-3">
                    <label for="cliente" class="form-label"
                      v-text="modal_detalhes.evento == 0 ? 'Cliente' : 'Transportador' "></label>
                    <input type="text" class="form-control" id="cliente"
                      :value="modal_detalhes.evento == 0 ? modal_detalhes.cliente : modal_detalhes.nome_transportador"
                      disabled>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="cnpj" class="form-label">CNPJ</label>
                    <input type="text" class="form-control" id="cnpj" v-model="modal_detalhes.cnpj" disabled>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="doc_carga" class="form-label">Doc Carga</label>
                    <input type="text" class="form-control" id="doc_carga" v-model="modal_detalhes.doc_carga" disabled>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="telefone" class="form-label">Telefone</label>
                    <input type="text" class="form-control" id="telefone" v-model="modal_detalhes.telefone" disabled>
                  </div>

                  <div class="col-md-6 mb-3" v-show="modal_detalhes.evento == 0">
                    <label for="nome_transportador" class="form-label">Nome Transportador</label>
                    <input type="text" class="form-control" id="nome_transportador"
                      v-model="modal_detalhes.nome_transportador" disabled>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="placa" class="form-label">Placa</label>
                    <input type="text" class="form-control" id="placa" v-model="modal_detalhes.placa" disabled>
                  </div>

                  <div class="col-md-6 mb-3" v-show="modal_detalhes.evento == 1">
                    <label for=" volume_recebido" class="form-label">Volume Recebido</label>
                    <input type="number" class="form-control" id="volume_recebido"
                      v-model="modal_detalhes.volume_recebido" disabled>
                  </div>
                  <div class="col-md-6 mb-3" v-show="modal_detalhes.evento == 0">
                    <label for="volume_venda" class="form-label">Volume Venda</label>
                    <input type="number" class="form-control" id="volume_venda" v-model="modal_detalhes.volume_venda"
                      disabled>
                  </div>

                  <div class="col-md-6 mb-3" v-show="modal_detalhes.evento == 0">
                    <label for="volume_carregado" class="form-label">Volume
                      Fornecido</label>
                    <input type=" number" class="form-control" id="volume_carregado"
                      v-model="modal_detalhes.volume_carregado" disabled>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="volume_tanque" class="form-label">Volume Tanque</label>
                    <input type="number" class="form-control" id="volume_tanque" v-model="modal_detalhes.volume_tanque"
                      disabled>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="estacao" class="form-label">Estação</label>
                    <input type="number" class="form-control" id="estacao" v-model="modal_detalhes.estacao" disabled>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="evento" class="form-label">Evento</label>
                    <input type="text" class="form-control" id="evento" :value="evento[modal_detalhes.evento]" disabled>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="data" class="form-label">Data</label>
                    <input type="text" class="form-control" id="data" :value="formatDate(modal_detalhes.data)" disabled>
                  </div>
                  <!-- <div class="col-md-6 mb-3">
                    <label for="status" class="form-label">Status</label>
                    <input type="number" class="form-control" id="status" value="0" disabled>
                  </div> -->
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>


      <!-- <div class="row mb-3">
<div class="col-11">
  <input type="text" id="input-buscar-pedidos" class="form-control" placeholder="Buscar Cliente"  v-model="busca" />
</div>
<div class="col-1">
  <div class="btn btn-outline-secondary ">Limpar</div>
</div>
</div> -->

    </div>
  </div>
</template>

<script>
import BarChart from './BarChart.vue'
import api from "../services/api.js";
import { store } from '../store.js'
import MixinGeral from "../mixins/mixin_geral.js"
export default {
  name: 'Registros',
  components: { BarChart },
  mixins: [MixinGeral],
  data() {
    return {
      filtro:1,
      titulo_filtro: ['', 'Cliente', 'Transportador'],
      store,
      busca:'',
      loading:false,
      evento:['fornecimento', 'recebimento'],
      status: [
        { nome: 'nível normal', class: 'text-bg-success', cor: '#198754' },
        { nome: 'nível baixo', class: 'text-bg-danger', cor: '#dc3545' },
        { nome: 'nível médio', class: 'text-bg-warning', cor: '#ffc107' },
      ],
      nome_estacoes: [
        { nome: 'Vacaria', volume: 78000, status: 1 },
        { nome: 'Clemente Argolo', volume: 122000, status: 0 },
        { nome: 'Campos Novos', volume: 45000, status: 2 },
        { nome: 'Cruz Alta', volume: 150000, status: 0 },
        { nome: 'Fortaleza do Valos', volume: 110000, status: 0 },
        { nome: 'Não-Me-Toque', volume: 120000, status: 0 },
        { nome: 'Palmeira das Missões', volume: 160000, status: 0 },
        { nome: 'Vitória das Missões', volume: 125000, status: 0 },
        // {nome:'Caxias do Sul', volume:5000},
      ],
      registros:[],
      modal_detalhes:{}
      
    };
  },
  computed:{
    Registros() {
      var self = this;
      var registros = this.store.estacoes[this.store.estacao].registros;
      var busca = this.busca.toLowerCase();
      var filtro = this.filtro

      // evento: ['fornecimento', 'recebimento'],
      if (filtro > 0) {
        registros = registros.filter((registro) => {

          return registro.evento == filtro -1
        })
      }

      // if (busca) {
      //   var data = registros.filter(function (row) {
      //     return Object.keys(row).some(function (key) {
      //       return (
      //         String(row[key])
      //           .toLowerCase()
      //           .indexOf(busca) > -1
      //       );
      //     });
      //   });
      //   return data;
      // }
      return registros;
    }
   
  },
  created() {
    if(!this.store.estacao){
      this.store.estacao = localStorage.getItem('estacao')
    }
    if(!this.store.usuario?.tipo_usuario){
      
      if (localStorage.getItem('usuario')){
        this.store.usuario = JSON.parse(localStorage.getItem('usuario'))
      }
    }
    this.FetchRegistros()
  },
  methods: {
    ModalDetalhes(registro){
      this.modal_detalhes = registro
      
      this.Modal('modal-detalhe', 'show')

    },
    Deletar(registro){
      // /deletar-registro
      let self = this
      const token = localStorage.getItem('token');
      var registros = this.store.estacoes[this.store.estacao].registros
      var id = registro.id
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      api.get(`/deletar-registro/${registro.id}`, config).then((response) => {

        registros = registros.filter(registro => registro.id !== id);
        self.store.estacoes[self.store.estacao].registros = registros
      }).catch((err) => {
        console.log('err');
        
      })
      
    },
   
    Atualizar(){
      let self = this
      self.loading = true
      setTimeout(() => {
        self.loading = false
        
      }, 200);
      this.FetchRegistros()
    }
    // FetchRegistros() {
    //   let token = localStorage.getItem('token');
    //   const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    //   };
    //   let self = this
    //   api.get("/registros", config).then((response) => {
    //     self.store.estacoes = self.AgruparPorEstacao(response.data.registros)
    //     self.store.registros = response.data.registros
    //   })
    // },

    // // Função para agrupar por estação
    // AgruparPorEstacao(array) {
    //   return array.reduce((acc, obj) => {
    //     const station = obj.estacao;
    //     if (!acc[station]) {
    //       acc[station] = {
    //         estacao: station,
    //         registros: [],
    //         ultimo_registro: null
    //       };
    //     }
    //     acc[station].registros.push(obj);
    //     // Atualiza o último registro se a data for mais recente
    //     if (!acc[station].ultimo_registro || new Date(obj.data) > new Date(acc[station].ultimo_registro.data)) {
    //       if (obj.volume_tanque <= 20000) {
    //         obj.status = 1
    //       } else {
    //         obj.status = 0

    //       }
    //       acc[station].ultimo_registro = obj;
    //     }
    //     return acc;
    //   }, {});
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
    
  },
};
</script>

<style scoped>
.filtro-selecionado{
  background-color: ;
}
</style>