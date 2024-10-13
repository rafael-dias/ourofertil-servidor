import api from "../services/api.js";
export default {

    methods: {
        Modal(idmodal, e) {

            let ele = document.getElementById(idmodal)
            let modal = bootstrap.Modal.getOrCreateInstance(ele)
            // console.log('[ modal]: ', modal) 
            // if (modal == null){
            //     modal = new bootstrap.Modal('#'+idmodal);
            // }


            // console.log('[ modal]: ', modal) 
            if (e == 'show') {
                modal.show()
            }
            if (e == 'hide') {
                // console.log('[ hide]: ', modalhide ,' - ', e) 
                // console.log('[ Modal Boots]: ', bootstrap.Modal)
                modal.hide()
                // document.getElementById(idmodal).style.display = 'none'
                // document.getElementsByClassName('modal-backdrop')[0].style.display = 'none'
                // document.getElementsByClassName('modal-backdrop')[1].style.display = 'none'
            }
        },
        FetchRegistros() {
            let self = this
            const token = localStorage.getItem('token');

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

        //    console.log(config);
           
            api.get("/registros", config).then((response) => {
                // console.log(response);
                
                // if (response.status == 403 || response.status == 401){
                //     self.$router.push('/login')
                //     return
                // }
                // self.store.autenticacao = true
                self.store.estacoes = self.AgruparPorEstacao(response.data.registros)
                self.store.registros = response.data.registros
            }).catch((err)=>{
                localStorage.removeItem('token')
                self.$router.push('/login')
                console.log('err');
                
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
        }
    }
}