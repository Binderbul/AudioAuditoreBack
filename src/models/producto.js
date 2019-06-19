const mongoose = require('mongoose');//usamos el modulo de mongoose para modelar los datos y lo ponemos en una constante
const { Schema } = mongoose;//requerimos el Schema de mongoose

const ProductoSchema = new Schema({//definimos el esquema de los datos
    nombre: { type: String, required: true },//definimos propiedades
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }
},{ timestamps: true});

module.exports = mongoose.model('Producto', ProductoSchema);//definimos el modelo de task y le damos el esquema definido, ademas lo exportamos