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
<<<<<<< HEAD
=======
        required: false,
>>>>>>> d0f8ec4c683f2a0005e103cb770f700038247d9e
        default: function () {
            return generarAleatorio(1000000000, 9999999999).toString()
        }
    },

    tipoCuenta: {
        type: String,
        required: true,
        enum: ['Monetaria', 'Ahorro', 'Corriente']
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
<<<<<<< HEAD
        default: 100,
=======
        default: 0,
>>>>>>> d0f8ec4c683f2a0005e103cb770f700038247d9e
    },
});

const generarAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;

};




module.exports = mongoose.model('Cuenta', CuentaSchema);