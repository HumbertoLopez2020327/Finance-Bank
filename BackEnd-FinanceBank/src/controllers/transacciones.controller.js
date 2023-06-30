'use strict'

const Transaccion = require('../models/transacciones.model');

const RealizarTransaccion = async(req, res) =>{
      const{codigoAutorizacion} = req.body;
    try {
          let transaccion = await Transaccion.findOne ({codigoAutorizacion:codigoAutorizacion});
          if(transaccion){
            return res.status(400).send({msg:'Este codigo de Autorizacion ya no esta vigente',
            ok: false,
            transaccion: transaccion
        });
          }

         transaccion = new Transaccion(req.body);

         transaccion = await transaccion.save();
         res.status(200).send({msg:`Su ${transaccion.TipoDeTransaccion} realizada exitosamente`, transaccion});
    } catch (error) {
        throw new Error(error)
    }
};

const Historial = async(req, res) =>{
    try {
         const transaccion = await Transaccion.find();

         if(!transaccion){
            res.status(500).send({msg:'No hay transacciones recientes'});

         }else{
            res.status(200).json({transaccion:transaccion})
         }
    } catch (error) {
        throw new Error(error)
    }
};

module.exports={
    RealizarTransaccion,
    Historial,
}