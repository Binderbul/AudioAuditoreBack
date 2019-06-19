const mongoose = require('mongoose');//usamos el modulo de mongoose para modelar los datos y lo ponemos en una constante
const { Schema } = mongoose;//requerimos el Schema de mongoose

const TiendaSchema = new Schema({//definimos el esquema de los datos
    nombre: { type: String, required: true },//definimos propiedades
    direccion: { type: String, required: true },
    productos:{
        type: [{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Producto'
        }]
    }
});

module.exports = mongoose.model('Tienda', TiendaSchema);//definimos el modelo de task y le damos el esquema definido, ademas lo exportamos