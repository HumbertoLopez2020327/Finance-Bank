'use strict'

const Favorito = require("../models/favorito.model");
const Cuenta = require("../models/cuenta.model");

const getFavoritos = async (req, res)=>{
    const cuentasFavorito = await Favorito.find();

    if(cuentasFavorito){
        res.json({cuentasFavorito});

    }else{
        res.json({msg:'No se han agregado favoritos'});
    }
};

const addFavoritos = async(req, res) =>{
    const {nombre, NoCuenta, } = req.body;
     //Existe la cuenta?
    const estaEnCuenta = await Cuenta.findOne({nombre});

     //Verificamos los campos
     
     const noEstaVacio = nombre !=="" && NoCuenta!=="";
     
     //Verificamos si la cuenta esta en favoritos

     const estaEnFavoritos = await Favorito.findOne({nombre});

     //En caso de que no este la cuenta mandar:

     if(!estaEnCuenta){
        res.status(400).json({
            msg:'Esta cuenta no existe, consulte con el propietario',
        });
       
        //Si nos envian la cuenta y no esta en favoritos la mandamos a agregar
     }else if(noEstaVacio && !estaEnFavoritos){
        const newCuentaInFavorito = new Favorito({nombre, NoCuenta });

        //Actualizamos InFav: 

        await Cuenta.findByIdAndUpdate(
            estaEnCuenta?._id,
            { inFav: true, nombre, NoCuenta},
            {new:true}
        )

        .then((cuenta)=>{
            newCuentaInFavorito.save();
            res.json({
                msg:`La cuenta se agrego a favoritos`,
                cuenta,
            });
        })

        .catch((error) => console.error(error));
        
     }else if(estaEnFavoritos){
        res.status(505).json({
            msg:"la cuenta ya fue agregada a favoritos",
        })

     }


};



module.exports ={
    getFavoritos,
    addFavoritos,
}