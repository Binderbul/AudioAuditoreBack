const mongoose = require('mongoose');//usamos el modulo de mongoose para modelar los datos y lo ponemos en una constante
const { Schema } = mongoose;//requerimos el Schema de mongoose

const ComentarioSchema = new Schema({//definimos el esquema de los datos
    comentario: { type: String},//definimos propiedades
    estrellas: { type: Number},//definimos propiedades
    idObjetoRelacionado: { type: String},
    nombreUsuarioRelacionado: { type: String},//definimos propiedades
    idUsuarioRelacionado: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
},{ timestamps: true});

module.exports = mongoose.model('Comentario', ComentarioSchema);//definimos el modelo de task y le damos el esquema definido, ademas lo exportamos