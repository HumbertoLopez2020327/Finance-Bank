'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TransaccionSchema = Schema({
    TipoDeTransaccion:{
        type: String,
        enum: ['Transferencia', 'Pago', 'Creditos', 'Depositos'],
        required:true
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

    fechaEmitida:{
        type: String,
        required: true,
    },

   codigoAutorizacion:{
      type: String,
      required:true
   }  
});

module.exports = mongoose.model('transaccion', TransaccionSchema);