'use strict'

require('dotenv').config();
const database = process.env.DATABASE;
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connection = async () => {
    try {
        await mongoose.connect(database);
        console.log('Conectado correctamente a la base de datos');
    } catch (err) {
        throw new Error('Error al conectarse a la base de datos' + err);

    }
}

module.exports = {
    connection,
}