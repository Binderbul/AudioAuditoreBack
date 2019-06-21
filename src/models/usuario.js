const mongoose = require('mongoose');//usamos el modulo de mongoose para modelar los datos y lo ponemos en una constante
const { Schema } = mongoose;//requerimos el Schema de mongoose

const UsuarioSchema = new Schema({//definimos el esquema de los datos
    spotifyId: { type: String},//definimos propiedades
    displayName: { type: String},//definimos propiedades
    uriSpotify: { type: String},//definimos propiedades
},{ timestamps: true});

module.exports = mongoose.model('Usuario', UsuarioSchema);//definimos el modelo de task y le damos el esquema definido, ademas lo exportamos