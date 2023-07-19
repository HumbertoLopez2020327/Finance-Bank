'use strict'

const {Router} = require('express');
const{ RealizarTransaccion, Historial } = require('../controllers/transacciones.controller');

const api = Router();

api.post('/realizar-transaccion', RealizarTransaccion);
api.get('/historial', Historial);
module.exports = api;