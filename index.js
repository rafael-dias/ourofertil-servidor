require('dotenv').config()
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

    const db = require('./db/db')
    const Clientes = require('./db/clientes')
    const Usuarios = require('./db/usuarios')
    const Estacao = require('./db/estacao')
    const Registro = require('./db/registro')
     db.sync()

    // const novoUsuario =  Clientes.create({
    //     usuario: 'teste',
    //     senha:'teste',
    //     cidade:'caxias do sul',

    // })

app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).render('login.html')
})
app.get('/login', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    res.status(200).json({msg:'ok'})
})

app.post('/login', async (req, res) => {
    // console.dir(req);
   console.log(req.body);
    const {usuario, senha, cidade} = req.body
    

    if(!usuario){
        return res.status(422).json({msg:'o usuário é obrigatório'})
    }
    if (!senha) {
        return res.status(422).json({ msg: 'a senha é obrigatória' })
    }

    // const novoUsuario = await Usuarios.create({
    //     usuario: 'teste',
    //     senha:'teste',
    //     cidade:'caxias do sul',

    // })


    // const usuarioExiste = await Usuarios.findOne({where:{usuario, senha}})
    // const usuarioExiste = await Usuarios.findByPk(1)

    // console.log(usuarioExiste);
    

    // if(usuarioExiste === null){
    //     console.log('Usuario não encontrado');
    // }else{
    //     console.log('usuario: ', usuarioExiste.id);
        
    // }
    // if (!cidade) {
    //     return res.status(422).json({ msg: 'a cidade é obrigatória' })
    // }
    res.status(200).json({ msg: 'ok' })
})
app.post('/registros', async (req,res)=>{
    console.log(req.body);
    const { cliente, doc_carga, cnpj, nome_transportador, placa, volume, data, estacao, volume_estacao } = req.body
    
    await Registro.create({
        cliente: cliente,
        doc_carga: doc_carga,
        cnpj: cnpj,
        nome_transportador: nome_transportador,
        placa: placa,
        volume: volume,
        data: data,
        estacao: estacao,
        volume_estacao: volume_estacao,
    })

    
    
    res.status(200).json({ msg: 'ok' })


})

app.get('/registros', async (req, res) => {
  

    let registros = await Registro.findAll()



    res.status(200).json({ registros})


})



app.listen(3000)