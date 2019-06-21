const mongoose = require('mongoose');//usamos el modulo de mongoose para modelar los datos y lo ponemos en una constante
const { Schema } = mongoose;//requerimos el Schema de mongoose

const PlaylistSchema = new Schema({//definimos el esquema de los datos
    spotifyId: { type: String},//definimos propiedades
    name: { type: String},//definimos propiedades
    uriSpotify: { type: String},
    comentarios:{
        type: [{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Comentario'
        }]
    }
},{ timestamps: true});

module.exports = mongoose.model('Playlist', PlaylistSchema);//definimos el modelo de task y le damos el esquema definido, ademas lo exportamos