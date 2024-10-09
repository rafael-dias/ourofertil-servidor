const { Sequelize } = require('sequelize');
const db = require('./db')

const Registro = db.define('registro', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
    ,
    // id_cliente:{
    //     type: Sequelize.INTEGER,
    //     allowNull:false,
    //     references: 'clientes', // <<< Note, its table's name, not object name
    //     referencesKey: 'id'
    // },
    cliente: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false
    },
    doc_carga: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome_transportador: {
        type: Sequelize.STRING,
        allowNull: false
    },
    placa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    volume_recebido: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    volume_venda: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    volume_carregado: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    volume_tanque: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    estacao: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    evento: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    data: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

module.exports = Registro;