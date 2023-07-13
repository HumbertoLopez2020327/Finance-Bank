"use strict"

const express = require("express")
const app = express();
const {connection} = require("./src/database/connection");
require("dotenv").config();
const port = process.env.PORT;
const { cuentaDefault } = require("./src/controllers/cuenta.controller")

const routesUser = require('./src/routes/user.routes');
const cuentaRoute = require('./src/routes/cuenta.routes');
const transaccionRoute = require('./src/routes/transacciones.routes');
const favoritoRoute = require('./src/routes/favorito.routes');
const cors = require("cors");
/* const { userDefault } =require("./src/controllers/user.controller") */
connection();
cuentaDefault();
/* userDefault();
 */
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use ('/api', routesUser);
app.use('/api', cuentaRoute);
app.use('/api', transaccionRoute);
app.use('/api', favoritoRoute);

app.listen(port, ()=> {
    console.log(`Servidor corriendo en el puerto ${port}`);
})

