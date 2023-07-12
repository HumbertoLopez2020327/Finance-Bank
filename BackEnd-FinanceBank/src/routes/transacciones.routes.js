'use strict'

const {Router} = require('express');
const{ RealizarTransaccion, Historial, createTransferenicas } = require('../controllers/transacciones.controller');

const api = Router();

api.post('/Transferencia', createTransferenicas);       
api.get('/historial', Historial);
module.exports = api;