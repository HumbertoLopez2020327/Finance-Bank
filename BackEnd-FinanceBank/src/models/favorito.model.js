'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoritoSchema = new Schema({
   nombre:{
      type: String,
      required: true,
   },

   Alias:{
      type: String,
      required: true,
   },

   NoCuenta:{
          type: Number,
          required:true,
   }

});

module.exports = mongoose.model("favorito", FavoritoSchema);