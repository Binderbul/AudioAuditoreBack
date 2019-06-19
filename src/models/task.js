const mongoose = require('mongoose');//usamos el modulo de mongoose para modelar los datos y lo ponemos en una constante
const { Schema } = mongoose;//requerimos el Schema de mongoose

const TaskSchema = new Schema({//definimos el esquema de los datos
    title: { type: String, required: true },//definimos propiedades
    description: { type: String, required: true },
});

module.exports = mongoose.model('Task', TaskSchema);//definimos el modelo de task y le damos el esquema definido, ademas lo exportamos