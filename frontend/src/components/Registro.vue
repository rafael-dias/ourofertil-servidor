<template>
  <div>

    <div class="container">

      <div class="row">
        <h3 class="mb-5">Registro da Estação: Vacaria <span class="btn bt-sm btn-outline-secondary">Exportar
            Dados</span>
        </h3>
        <div class="row">

          <div class="col-3 mb-3">
            <div class="card" style="width: 18rem;">
              <h6 class="card-header">
                Estação {{ store.estacoes[store.estacao].estacao }}
              </h6>

              <div class="card-body">

                <BarChart :volume="store.estacoes[store.estacao].ultimo_registro.volume_tanque" :capaciade="200000" :cor="status[store.estacoes[store.estacao].ultimo_registro.status].cor" />
                <p class=" text-center"> <span class="badge text-bg-success"
                    :class="status[store.estacoes[store.estacao].ultimo_registro.status].class">{{ status[store.estacoes[store.estacao].ultimo_registro.status].nome }}</span></p>
                <p class=" text-center mt-3 text-body-secondary">ultima atualização: {{ formatDate(store.estacoes[store.estacao].ultimo_registro.data) }}</p>
                <div class="mt-3 pt-3 mb-0  pb-0 card-footer text-body-secondary d-flex">
                  <!-- <RouterLink class="ms-auto me-0  btn btn-outline-secondary card-link" to="/registro">Detalhes
                  </RouterLink> -->
                  <br>

                </div>
              </div>
            </div>
          </div>
          <div class="col-9">
            <table class="table table-sm table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">CPF/CNPJ</th>
                  <th scope="col">Documento Carga</th>
                  <th scope="col">Volume Recebido</th>
                  <th scope="col">Volume Venda</th>
                  <th scope="col">Volume Carregado</th>
                  <th scope="col">Volume Tanque</th>
                  <th scope="col">Evento</th>
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
                <tr v-for="(reg, i) in store.estacoes[store.estacao].registros">
                  <th scope="row">{{ i + 1 }}</th>
                  <td>{{ reg.cliente }}</td>
                  <!-- <td>{{ reg.nome_transportador }}</td> -->
                  <td>{{ reg.cnpj }}</td>
                  <td>{{ reg.doc_carga }}</td>
                  <td>{{ reg.volume_recebido }}</td>
                  <td>{{ reg.volume_venda }}</td>
                  <td>{{ reg.volume_carregado }}</td>
                  <td>{{ reg.volume_tanque }}</td>
                  <td>{{ reg.evento == 0 ?'fornecimento':'recebimento' }}</td>
                  <td>
                    <div class="btn btn-sm btn-outline-secondary ">Detalhes</div>
                  </td>
                </tr>

              </tbody>
            </table>

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
export default {
  name: 'Clientes',
  components: { BarChart },
  data() {
    return {
      store,
      busca:'',
      status: [
        { nome: 'nível normal', class: 'text-bg-success', cor: '#198754' },
        { nome: 'nível baixo', class: 'text-bg-danger', cor: '#dc3545' },
        { nome: 'nível médio', class: 'text-bg-warning', cor: '#ffc107' },
      ],
      estacoes: [
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
      clientes:[
        {
          nome: 'CLiente 1',
          doc: '099999999999',
          transportador: 'Transportador 1',
          placa: 'AAA-9999',
          volume_total: '35.789l',
        },
        {
          nome: 'CLiente 2',
          doc: '099999999999',
          transportador: 'Transportador 1',
          placa: 'AAA-9999',
          volume_total: '35.789l',
        },
        {
          nome: 'CLiente 3',
          doc: '099999999999',
          transportador: 'Transportador 1',
          placa: 'AAA-9999',
          volume_total: '35.789l',
        },
        {
          nome: 'CLiente 4',
          doc: '099999999999',
          transportador: 'Transportador 1',
          placa: 'AAA-9999',
          volume_total: '35.789l',
        },
        {
          nome: 'CLiente 5',
          doc: '099999999999',
          transportador: 'Transportador 1',
          placa: 'AAA-9999',
          volume_total: '35.789l',
        },
        {
          nome: 'CLiente 6',
          doc: '099999999999',
          transportador: 'Transportador 1',
          placa: 'AAA-9999',
          volume_total: '35.789l',
        },
        {
          nome: 'CLiente 7',
          doc: '099999999999',
          transportador: 'Transportador 1',
          placa: 'AAA-9999',
          volume_total: '35.789l',
        },
        {
          nome: 'CLiente 8',
          doc: '099999999999',
          transportador: 'Transportador 1',
          placa: 'AAA-9999',
          volume_total: '35.789l',
        },
      ]
    };
  },
  computed:{
    Clientes() {
      var self = this;
      var clientes = this.clientes;
      var busca = this.busca.toLowerCase();


      if (busca) {
        var data = clientes.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(busca) > -1
            );
          });
        });
        return data;
      }
      return clientes;
    }
   
  },
  created() {
    this.FetchRegistros()
  },
  methods: {

    FetchRegistros() {
      let token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      let self = this
      api.get("/registros", config).then((response) => {
        self.store.estacoes = self.AgruparPorEstacao(response.data.registros)
        self.store.registros = response.data.registros
      })
    },

    // Função para agrupar por estação
    AgruparPorEstacao(array) {
      return array.reduce((acc, obj) => {
        const station = obj.estacao;
        if (!acc[station]) {
          acc[station] = {
            estacao: station,
            registros: [],
            ultimo_registro: null
          };
        }
        acc[station].registros.push(obj);
        // Atualiza o último registro se a data for mais recente
        if (!acc[station].ultimo_registro || new Date(obj.data) > new Date(acc[station].ultimo_registro.data)) {
          if (obj.volume_tanque <= 20000) {
            obj.status = 1
          } else {
            obj.status = 0

          }
          acc[station].ultimo_registro = obj;
        }
        return acc;
      }, {});
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${day}/${month}/${year} - ${hours}:${minutes}`;
    },
    
  },
};
</script>

<style scoped>

</style>