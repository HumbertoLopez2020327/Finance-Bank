'use strict'

const Transaccion = require('../models/transacciones.model');
const Cuentas = require('../models/cuenta.model');

const createTransferenicas = async(req, res) =>{

    const { noCuentaFuente, noCuentaDestinatario, saldo, monto, descripcion, date} = req.body;
    try{
        let cuentaFuente = await Cuentas.findOne({ NoCuenta: noCuentaFuente });
        let cuentaDestinatario = await Cuentas.findOne({ NoCuenta: noCuentaDestinatario});
        if (!cuentaFuente){
            return res.status(404).send({ msg: 'El número de cuenta no existe' });
        }
        if (!cuentaDestinatario){
            return res.status(404).send({msg: 'El número de cuenta no existe, verifica los datos'});
        }
        if (monto > 10000){
            return res.status(400).send({msg: 'Lo sentimos, pero no puede realizar transacciones mayores a Q.10,0000.00'})
        }
        if (monto > cuentaFuente.saldo){
            return res.status(404).send({msg: 'Tú saldo es insuficiente para realizar la transferencia'});
        }
        await Cuentas.findOneAndUpdate(
            { NoCuenta: noCuentaFuente},
            { $inc: { saldo: -monto} },
        );
        await Cuentas.findOneAndUpdate(
            { NoCuenta: noCuentaDestinatario},
            { $inc: { saldo: monto }},
        );
        
        const transferencia = new Transaccion({
            noCuentaFuente: noCuentaFuente,
            saldo: saldo,
            date: date,
            noCuentaDestinatario: noCuentaDestinatario,
            monto: monto,
            descripcion: descripcion,
        });

        const newTransferencia = await transferencia.save();

        res.status(210).send({
            msg: 'Transferencia creada',
            ok: true,
            transferencia: newTransferencia,
        });

    }catch (err){
        console.log(err);
        console.log('Error al crear la transferencia');
    }
};


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
    createTransferenicas,
    
}