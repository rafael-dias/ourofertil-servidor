const { Sequelize } = require('sequelize');
const db = require('./db')

const Estacao = db.define('estacao', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
        }
    ,
    nome:{
        type: Sequelize.STRING,
        allowNull:false
    },
    capacidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    volume: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_atualizacao: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
})

module.exports = Estacao;