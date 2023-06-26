const {request, response} = require('express');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const User = require('../models/user.models');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    //cuando el toquen no viene
    if(!token){
        return res.status(401).send({
            msg: 'No hay token en la petición',
        });
    }

    try{
        //decodificar el token
        const payload = jwt.decode(token, process.env.SECRET_KEY);
        const userEncontrado = await User.findById(payload.uId);
        console.log(userEncontrado);

        //verifica si el token no ha expirado
        if(payload.exp <= moment().unix()){
            return res.status(500).send({msg: 'El token ha expirado'});
        }
        if (!userEncontrado){
            return res.status(500).send({msg: 'El token ha expirado'});
        }
        if(!userEncontrado){
            return res.status(401).send({
                msg: 'Token no valido - user no existe en DB fisicamente',
            });
        }
        req.user = userEncontrado;
        next();

    }catch(err){
        throw new Error(err);
    }
};

module.exports = {
    validateJWT
};