const mongoose = require('mongoose');//usamos el modulo de mongoose para establecer una conexion a la base de datos y lo ponemos en una constante

//si intentamos conectar a una base de datos que no existe, mongo la crea automaticamente
const URI = 'mongodb+srv://admin:admin@cluster0-ydygo.mongodb.net/test?retryWrites=true&w=majority';//direccion de la base de datos, en este caso una base local. Base llamada mern-tasks

mongoose.connect(URI,{ useNewUrlParser: true })//conecta a la direccion de la base de datos
    .then(db => console.log('La base de datos esta conectada'))//muestra mensaje de conexion
    .catch(err => console.log(err));//muestra error

module.exports = mongoose;//exportamos la conexion con mongoose *?