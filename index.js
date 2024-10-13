require('dotenv').config()
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const path = require('path')
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

const sequelize = require('./db/db')

const Clientes = require('./db/clientes')
const Usuarios = require('./db/usuarios')
const Estacao = require('./db/estacao')
const Registro = require('./db/registro')
const cors = require('cors');

// Chave secreta para JWT
const SECRET_KEY = '$2y$08$FU8dS9JZcSKLEKfGi3IMO.6sAnrdju/EABmG.w2GcINObVyM.N1Uy';

sequelize.sync()
async function createAdminUser() {
    const admin = await Usuarios.findOne({ where: { usuario: 'admin' } });
    if (!admin) {
        const hashedPassword = await bcrypt.hash('NodeRed#01234', 10);
        await Usuarios.create({
            usuario: 'admin',
            senha: hashedPassword,
            cidade: '',
            tipo_usuario: 999
        });
        console.log('Usuário administrador criado.');
    } else {
        console.log('Usuário administrador já existe.');
    }
}
async function createUser() {
    const user = await Usuarios.findOne({ where: { usuario: 'ouropro' } });
    if (!user) {
        const hashedPassword = await bcrypt.hash('OuroPro#01234', 10);
        await Usuarios.create({
            usuario: 'ouropro',
            senha: hashedPassword,
            cidade: '',
            tipo_usuario: 1
        });
        console.log('Usuário Ouropro criado.');
    } else {
        console.log('Usuário Ouropro já existe.');
    }
}

createAdminUser();
createUser()

// const novoUsuario =  Clientes.create({
//     usuario: 'teste',
//     senha:'teste',
//     cidade:'caxias do sul',

// })
app.use(cors({
    origin: '*'
}));
// Serve os arquivos estáticos da pasta 'dist' gerada pelo Vite
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Rota para a aplicação Vue
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
// });

app.use(express.json())
app.use(bodyParser.json());



// Função para gerar token JWT
function generateToken(user) {
    return jwt.sign({ id: user.id, usuario: user.usuario }, SECRET_KEY, { expiresIn: '7d' });
}

// Middleware de autenticação
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

        
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, { clockTolerance: 50 },(err, user) => {
        // console.log('erro ', err);
        
        if (err) return res.status(403).json({ message: 'Token é invalido ou esta expirado' });
        req.user = user;
        next();
    });
}





app.post('/adduser', authenticateToken, async (req, res) => {
    const { usuario, senha, cidade, tipo_usuario } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await Usuarios.create({ usuario, senha: hashedPassword, cidade, tipo_usuario });
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao registrar usuário.', error });
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
})
app.get('/login', (req, res) => {
    // console.log(req.params);
    // console.log(req.body);
    res.status(200).json({ msg: 'ok' })
})

app.post('/login', async (req, res) => {
    // console.dir(req.body);
    const { usuario, senha } = req.body;
    const user = await Usuarios.findOne({ where: { usuario } });
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado!' });

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) return res.status(400).json({ message: 'Senha incorreta!' });

    const token = generateToken(user);
    res.json({ token });
    // res.json({ token, redirectUrl: '/dashboard' });
})




app.post('/registros',  async (req, res) => {
    // console.log(req.body);

    // cliente: 'rafael',
    // nome_transportador: 'TTTTTTTT',
    // cnpj: '02268585026',
    // placa: 'pppppp',
    // telefone: '9999999',
    // doc_carga: 'doc',
    // volume_recebido: 0,
    // volume_venda: 10000,
    // volume_carregado: 0,
    // volume_tanque: 0,
    // estacao: 14,
    // data: '2024-10-09T20:29:06.878Z',
    // evento: 1

    const {
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
        data,
        evento

    } = req.body

    await Registro.create({
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
        data,
        evento
    })



    res.status(200).json({ msg: 'ok' })


})



app.post('/sync', async (req, res) => {
    // console.log(req.body);
    let options = {
        fields: ["cliente", "nome_transportador", "cnpj", "placa", "telefone", "doc_carga", "volume_recebido", "volume_venda", "volume_carregado", "volume_tanque", "estacao", "data", "evento"]
    }
    await Registro.bulkCreate(req.body, options)
    res.status(200).json({ msg: 'ok' })
})

app.get('/registros', authenticateToken, async (req, res) => {
// console.log('registros', req.body);
    let registros = await Registro.findAll({
        order: [['createdAt', 'DESC']]
    })
    res.status(200).json({ registros })
})



app.listen(3000, () => {
    console.log('Servidor rodando na porta ', 3000)
})