const express = require('express');//usamos el modulo de express y lo ponemos en una constante
const router = express.Router();//objeto router (ruteador) que carga al Router de express

const Task = require('../models/task');//requerimos el archivo de task, para usar su modelo

//Ruta default, get
router.get('/', async (req,res,next) => {
    
    //FORMA ASINCRONA
    const tasks = await Task.find();//esta consulta va a tomar tiempo, cuando termine, las pone en la constante tasks
    res.json(tasks);    

    //===FORMA CON CALLBACKS; ANTIGUA
    // Task.find((err,tasks) => {//hacemos una consulta a la base de datos del modelo task, el callback en su segundo parametro pone los resultados *? https://mongoosejs.com/docs/api.html#model_Model.find
    //     console.log(tasks);        
    //     res.json({
    //         status: 'La API funciona'
    //     });
    // });
});

//Ruta default (con id), get, solo uno
router.get('/:id', async (req,res,next) => {
    const task = await Task.findById(req.params.id);//buscamos por id y almacenamos en una tarea
    res.json(task);
});

//ruta default, post
router.post('/', async (req,res,next) => {
    console.log(req.body);//mostramos el request
    const { title, description} = req.body;//asignamos a constantes la informacion del request
    const task = new Task({title,description});//creamos el modelo del Task y asignamos a una constante
    //forma antigua de crear el modelo
    // new Task({
    //     title: title,
    //     description: description
    // });
    console.log(task);//mostramos el objeto del modelo creado
    await task.save();//lo guardamos en la base de datos, y pedimos que espere con await
    res.json({status: 'task guardado'});
});

//ruta default (con id), put
router.put('/:id', async (req,res,next) => {
    const { title, description} = req.body;//obtenemos los nuevos valores
    const newTask = {title,description};// creamos un modelo con los nuevos valores
    await Task.findByIdAndUpdate(req.params.id,newTask);//actualizamos con el nuevo modelo
    res.json({status: 'task actualizado'});
});

//ruta default (con id), delete
router.delete('/:id', async (req,res,next) => {
    await Task.findByIdAndRemove(req.params.id);//eliminamos con el id
    res.json({status: 'task eliminado'});
});



module.exports = router;//exportamos el router *?