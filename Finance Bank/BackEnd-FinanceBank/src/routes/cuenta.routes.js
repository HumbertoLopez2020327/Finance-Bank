'use strict'

const {Router} = require('express');
const { createCuenta, updateCuenta, deleteCuenta } = require('../controllers/cuenta.controller');

const api = Router();

api.post('/create-cuenta', createCuenta);
api.put('/update-cuenta/:id', updateCuenta);
api.delete('/delete-cuenta/:id', deleteCuenta);

module.exports = api;