'use strict'

const {Router} = require('express');
const { createCuenta, updateCuenta, deleteCuenta, createUser, listUser, deleteUser, editUser, loginUser, searchAccount } = require('../controllers/cuenta.controller');
const { validateParams } = require ('../middlewares/validate-params')
const { check } = require ('express-validator');

const api = Router();

api.post('/create-cuenta', [
    check('nombre', 'El nombre es necesario para seguir este proceso').not().isEmpty(),
    check('apellido', 'El nombre es necesario para seguir este proceso').not().isEmpty(),
    check('dpi', 'El número de dpi debe contener 13 dijitos').isLength({min: 13}),
    check('tipoCuenta', 'El tipo de cuenta no puede quedar vacio, debes escoger entre, Monetario, Ahorro y Corriente').not().isEmpty(),
    validateParams
] ,createCuenta);
api.put('/update-cuenta/:id', updateCuenta);
api.delete('/delete-cuenta/:id', deleteCuenta);

//User
api.post('/create-user',[
    check('email', 'El email es obligatorio, no puedes dejarlo vacio').not().isEmpty(),
    check('password', 'La constraseña debe ser mayor a 6 dijitos').isLength({min: 6}),
    validateParams
], createUser);

api.get('/list-user', listUser);
api.put('/edit-user/:id', editUser);
api.delete('/delete-user/:id', deleteUser);
api.post('/login', loginUser);
api.get('/search-account', searchAccount);
module.exports = api;