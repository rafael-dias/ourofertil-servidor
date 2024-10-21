import { reactive } from 'vue'

export const store = reactive({
    autenticacao:"",
    usuario:{},
    registros:[],
    estacoes:[],
    estacao:null,
})
