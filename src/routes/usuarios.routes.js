const express = require('express');//usamos el modulo de express y lo ponemos en una constante
const router = express.Router();//objeto router (ruteador) que carga al Router de express

const Usuario = require('../models/usuario');//requerimos el archivo de task, para usar su modelo


//ruta default, post
router.post('/', async (req,res,next) => {
    console.log(req.body);//mostramos el request
    const { spotifyId, displayName, uriSpotify} = req.body;//asignamos a constantes la informacion del request
    const usuario = new Usuario({spotifyId, displayName, uriSpotify});//creamos el modelo del Task y asignamos a una constante
    console.log(usuario);//mostramos el objeto del modelo creado
    await usuario.save();//lo guardamos en la base de datos, y pedimos que espere con await
    res.json({status: 'usuario guardado'});
});


module.exports = router;//exportamos el router *?