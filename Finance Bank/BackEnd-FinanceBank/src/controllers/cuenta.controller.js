'use strict'

const Cuenta = require('../models/cuenta.model');

const createCuenta = async(req, res) =>{
    const {dpi}= req.body;
    try{
        let cuenta = await Cuenta.findOne({dpi:dpi});
        if(cuenta){
            return res.status(400).send({msg: 'Este dpi esta asociado a otra cuenta',
            ok: false,
            cuenta: cuenta
        });
        }

        cuenta = new Cuenta(req.body);

        cuenta = await cuenta.save();
        res.status(200).send({msg:`Cuenta ${cuenta.nombre} creado exitosamente`, cuenta});

    }catch(error){
        throw new Error (error)
    }
};

const deleteCuenta = async(req, res)=>{
    try {
         const id= req.params.id;
         const cuentaDelete = await Cuenta.findByIdAndDelete(id);
         return res.status(200).send({msg:'La cuenta fue eliminada', cuentaDelete});

    } catch (error) {
        throw new Error(error);
    }
};

const updateCuenta = async(req, res)=>{
    try {
        const id=req.params.id;
        const cuentaEdit = {...req.body}
        const cuentaComplete = await Cuenta.findByIdAndUpdate(id, cuentaEdit,{
            new: true
        });
        if(cuentaComplete){
            return res.status(202).send({msg:'los cambios fueron realizados con exito', cuentaComplete});

        }else{
            res.status(404).send({msg:'esta cuenta no existe, revise los datos solicitados'});
        }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports={
    createCuenta,
    deleteCuenta,
    updateCuenta,
}