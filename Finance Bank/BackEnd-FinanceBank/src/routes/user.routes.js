'use strict'

const { Router } = require('express');

const { createUser, listUser, editUser, deleteUser, loginUser } = require('../controllers/user.controller');

const api = Router();

api.post('/create-user', createUser);

api.get('/list-user', listUser);

api.put('/edit-user/:id', editUser);

api.delete('/delete-user/:id', deleteUser);

api.post('/login', loginUser);

module.exports = api;