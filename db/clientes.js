const { Sequelize } = require('sequelize');
const db = require('./db')

const Clientes = db.define('clientes', {
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
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
})

module.exports = Clientes;