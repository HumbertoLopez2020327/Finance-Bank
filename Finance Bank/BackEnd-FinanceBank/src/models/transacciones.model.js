'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TransaccionSchema = Schema({
    TipoDeTransaccion:{
        type: String,
        required:false,
        enum: ['Transferencia', 'Pago', 'Creditos', 'Depositos'],
    },
  
    noCuentaFuente:{
        type:String,
        required:true
    },

    noCuentaDestinatario:{
        type: String,
        required: true
    }, 

    monto:{
      type: Number,
      required: true
    },

    date: {
        type: Date,
        default: Date.now,
        required: true
      },

   codigoAutorizacion:{
      type: String,
      required:false,
   },
   saldo:{
    type: Number,
    required: true
   },
   descripcion:{
    type: String,
    required: true,
   }  
});

module.exports = mongoose.model('transaccion', TransaccionSchema);