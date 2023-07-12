'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CuentaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },

    apellido: {
        type: String,
        required: true
    },

    dpi: {
        type: String,
        required: true,
        unique: true
    },

    NoCuenta: {
        type: String,
        required: true,
        default: function () {
            return generarAleatorio(1000000000, 9999999999).toString()
        }
    },

    tipoCuenta: {
        type: String,
        required: true,
        enum: ['Monetaria', 'Ahorro', 'Corriente']
    },

    usuario: {
        User: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: false
        },
    },

    inFav: {
        type: Boolean,
        default: false,
    },

    email:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true, 
    },

    rol:{
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },
    saldo:{
        type: Number,
        default: 0,
    },
});

const generarAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;

};




module.exports = mongoose.model('cuenta', CuentaSchema);