'use strict'

const {Router} = require('express');
const{ addFavoritos, getFavoritos }= require('../controllers/favorito.controller');

const api = Router();
api.get('/cuenta-fav', getFavoritos);
api.post('/cuenta-fav', addFavoritos);

module.exports = api;