'use strict'
const Users = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateJWT } = require("../helpers/create-jwt")

const userDefault = async (req, res) => {
    try {
        let user = new Users();
        user.name = "usuarioPrueba";
        user.password = "123456789";
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
        user.email = "usuarioprueba@gmail.com";
        user.rol = "USER"

        user = await user.save();
        return console.log(`El usuario ${user} ha sido creado por defecto`);
    } catch (error) {
        console.log(error)
    }
}

const createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await Users.findOne({ email });
        if (user) {
            return res.status(400).send({
                msg: 'Ya existe alguien con este correo',
                ok: false,
                user: user,
            });
        }

        user = new Users(req.body);

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
        const user = await Users.find();
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

        const userComplete = await Users.findByIdAndUpdate(id, edituser, { new: true, });

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
        const userD = await Users.findByIdAndDelete(id);
        return res.status(500).send({ msg: `usuario eliminado correctamente`, userD });
    } catch (err) {
        console.log(err);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .send({ ok: false, message: 'Debe de registrarse' });
        }
        const validPassword = bcrypt.compareSync(
            password,
            user.password
        )
        if (!validPassword) {
            return res
                .status(400)
                .send({ ok: false, message: 'Password incorrecto' });
        }
        const token = await generateJWT(user._id, user.name, user.email);
        res.json({
            ok: true,
            uId: user.id,
            name: user.name,
            email: user.email,
            token,
            message: `Usuario logeado correctamente, Bienvenido ${user.name}`
        })
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    createUser,
    listUser,
    editUser,
    deleteUser,
    loginUser,
    userDefault
};
