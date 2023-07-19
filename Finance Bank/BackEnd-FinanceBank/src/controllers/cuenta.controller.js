'use strict'
const Cuenta = require('../models/cuenta.model');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/create-jwt')


const createCuenta = async(req, res) =>{
    const {dpi, password}= req.body;
    try{
        let cuenta = await Cuenta.findOne({dpi:dpi});
        if(cuenta){
            return res.status(400).send({msg: 'Este dpi esta asociado a otra cuenta',
            ok: false,
            cuenta: cuenta
        });
        }
        cuenta = new Cuenta(req.body);

        const saltos = bcrypt.genSaltSync();
        cuenta.password = bcrypt.hashSync(password, saltos);

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
};

const cuentaDefault = async(req, res) =>{
    try{
        let cuenta = await new Cuenta();
        cuenta.nombre = "admin"
        cuenta.apellido = "admin"
        cuenta.dpi = "1234568797"
        cuenta.tipoCuenta = "Monetaria"
        cuenta.email = "admin@gmail.com"
        cuenta.password = "ADMIN"
        cuenta.rol = "ADMIN"
        cuenta.saldo = "10000000000"

        cuenta = await cuenta.save();
        return console.log(`La cuenta ${cuenta} ha sido creada correctamente`)
    }catch(error){
        console.log(error)
    }
}

//User movido a cuenta
const userDefault = async(req, res) =>{
    try{
        let user = new Cuenta();
        user.name = 'usuarioPrueba';
        user.password = '123456789';
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
        user.email = 'usuarioprueba@gmail.com';
        user.rol = 'USER';

        user = await user.save();
        return console.log(`El usuario ${user} ha sido creado por defecto`);

    }catch (err){
        console.log(err);
    }
};

const createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await Cuenta.findOne({ email });
        if (user) {
            return res.status(400).send({
                msg: 'Ya existe alguien con este correo',
                ok: false,
                user: user,
            });
        }

        user = new Cuenta(req.body);

        const saltos = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, saltos);

        user = await user.save();
        res.status(200).send({
            msg: 'Usuario creado correctamente',
            ok: true,
            user: user,
        })
    } catch (error) {
        console.log(error);
    }
};

const listUser = async (req, res) => {
    try {
        const user = await Cuenta.find();
        if (user.length == 0) return res.status(404).send({ msg: 'No se encontro usuarios' });
        return res.status(200).json({ 'Usuarios encontrados': user });

    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Ocurrio un error' })
    }
};

const editUser = async (req, res) => {
    try {
        const id = req.params.id;
        const edituser = { ...req.body };
        edituser.password = edituser.password
            ? bcrypt.hashSync(edituser.password, bcrypt.genSaltSync())
            : edituser.password;

        const userComplete = await Cuenta.findByIdAndUpdate(id, edituser, { new: true, });

        if (userComplete) {
            return res.status(200).send({
                msg: 'Se actualizarón correctamente los datos', userComplete
            });
        } else {
            res.status(404).send({
                msg: 'Este usuario no existe en la base de datos'
            });
        }
    } catch (err) {
        console.log(err);
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userD = await Cuenta.findByIdAndDelete(id);
        return res.status(500).send({ msg: `usuario eliminado correctamente`, userD });
    } catch (err) {
        console.log(err);
    }
};

const loginUser = async (req, res) => {
    const {email, password } = req.body;
    try {
        const cuenta = await Cuenta.findOne({ email });
        if (!cuenta) {
            return res.status(500).json({ message: 'Para ingresar, primer debe registrarse' });
        }
        bcrypt.compare(password, cuenta.password, async (error, isMatch) => {
            if (error) return res.status(500).send({ message: "Se ha producido un error" });
            if (isMatch) {
                const token = await generateJWT(cuenta.id, cuenta.email);
                res.status(200).json({ ok: true, uid: cuenta.id, email: cuenta.email, token });
            }
        });
    } catch (error) {
        console.log(error)
    }
}

const searchAccount = async (req, res) => {
   const NoCuenta = req.body.NoCuenta;
   const accountFind = await Cuenta.findOne({NoCuenta});
   if(!accountFind) return res.status(404).send({message: `No se encontro ${NoCuenta}`});
   return res.status(200).send({message: `No. de cuenta: `, accountFind});
};

module.exports={
    createCuenta,
    deleteCuenta,
    updateCuenta,
    userDefault,
    createUser,
    listUser,
    editUser,
    deleteUser,
    loginUser,
    searchAccount,
}