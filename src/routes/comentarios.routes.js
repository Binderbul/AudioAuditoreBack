const express = require('express');//usamos el modulo de express y lo ponemos en una constante
const router = express.Router();//objeto router (ruteador) que carga al Router de express

const Comentario = require('../models/comentario');//requerimos el archivo de task, para usar su modelo

//obtenemos los comentarios de un elemento
router.get('/elemento:idSpotify', async (req, res, next) => {
    try {
        const comentarios = await Comentario.findOne({ 'idObjetoRelacionado': req.params.idExterno });
        res.json(comentarios);
    }
    catch (error) {
        console.error(error);
    }
});

//obtenemos el comentario de un usuario en una seccion
router.get('/usuario:idUsuario&:idExterno', async (req, res, next) => {
    try {
        const comentario = await Comentario.findOne({ 'idUsuarioRelacionado': req.params.idUsuario, 'idObjetoRelacionado': req.params.idExterno });
        res.json(comentario);
    }
    catch (error) {
        console.error(error);
    }
});

//ruta default, post
router.post('/', async (req, res, next) => {
    try {
        const { comentario, estrellas, idObjetoRelacionado, nombreUsuarioRelacionado, idUsuarioRelacionado } = req.body;
        const newComentario = new Comentario({ comentario, estrellas, idObjetoRelacionado, nombreUsuarioRelacionado, idUsuarioRelacionado });
        await newComentario.save();
        res.json({ status: 'comentario guardado' });
    }
    catch (error) {
        console.error(error);
    }
});

//ruta default (con id), put
router.put('/:id', async (req, res, next) => {
    try {
        const { comentario, estrellas, idObjetoRelacionado, nombreUsuarioRelacionado, idUsuarioRelacionado } = req.body;
        const newComentario = { comentario, estrellas, idObjetoRelacionado, nombreUsuarioRelacionado, idUsuarioRelacionado };
        await Comentario.findByIdAndUpdate(req.params.id, newComentario);
        res.json({ status: 'comentario actualizado' });
    }
    catch (error) {
        console.error(error);
    }
});

//ruta default (con id), delete
router.delete('/:id', async (req, res, next) => {
    try {
        await Comentario.findByIdAndRemove(req.params.id);
        res.json({ status: 'comentario eliminado' });
    }
    catch (error) {
        console.error(error);
    }
});

module.exports = router;//exportamos el router *?