const express = require('express');//usamos el modulo de express y lo ponemos en una constante
const routerTienda = express.Router();//objeto router (ruteador) que carga al Router de express

const Tienda = require('../models/tienda');//requerimos el archivo de modelo
const Producto = require('../models/producto');

//Ruta default, get
routerTienda.get('/', async (req, res, next) => {

    //FORMA ASINCRONA
    const tiendas = await Tienda.find();//esta consulta va a tomar tiempo, cuando termine, las pone en la constante tasks
    console.log(tiendas);
    res.json(tiendas);

    //===FORMA CON CALLBACKS; ANTIGUA
    // Task.find((err,tasks) => {//hacemos una consulta a la base de datos del modelo task, el callback en su segundo parametro pone los resultados *? https://mongoosejs.com/docs/api.html#model_Model.find
    //     console.log(tasks);        
    //     res.json({
    //         status: 'La API funciona'
    //     });
    // });
});

//ruta default, post
routerTienda.post('/', async (req, res, next) => {
    console.log(req.body);//mostramos el request
    const { nombre, direccion, productos } = req.body;//asignamos a constantes la informacion del request
    const nuevaTienda = new Tienda({ nombre, direccion, productos });//creamos el modelo del Task y asignamos a una constante
    //forma antigua de crear el modelo
    // new Task({
    //     title: title,
    //     description: description
    // });
    console.log(nuevaTienda);//mostramos el objeto del modelo creado
    await nuevaTienda.save((err, tienda) => {
        err ? res.status(409).send(err) : res.status(201).send(tienda);
    });//lo guardamos en la base de datos, y pedimos que espere con await
    res.json({ status: 'tienda guardada' });
});

//Ruta default (con id), get, solo uno
routerTienda.get('/:id', async (req, res, next) => {
    const tienda = await Task.findById(req.params.id)
        .exec()
        .then(tienda => res.send(store))
        .catch(err => res.status(409).send(err));//buscamos por id y almacenamos en una tarea
    //res.json(task);
});

//ruta default, post
routerTienda.post('/producto:idTienda', async (req, res, next) => {
    console.log(req.body);//mostramos el request

    const { idTienda } = req.params;
    const { nombre, precio, stock } = req.body;//asignamos a constantes la informacion del request
    const nuevoProducto = new Producto({ nombre, precio, stock });//creamos el modelo del Task y asignamos a una constante
    //forma antigua de crear el modelo
    // new Task({
    //     title: title,
    //     description: description
    // });
    console.log(nuevoProducto);//mostramos el objeto del modelo creado
    await nuevoProducto.save(async (err, producto) => {
        if (err) {
            res.status(409).send(err)
        } else {
            //res.status(201).send(producto);
            await Tienda.findByIdAndUpdate(
                idTienda,
                { $push: { productos: producto.id } },
                { new: true }).then(tienda => {
                    res.status(201).send(tienda);
                });
            res.json({ status: 'producto guardada' });
        }
    });//lo guardamos en la base de datos, y pedimos que espere con await
});

routerTienda.get('/tienda:id', async (req, res, next) => {
    const {idTienda} = req.params;
    Tienda.findOne({_id:idTienda})
    .populate('productos')
    .exec((err,producto)=>{
        res.send(producto);
    });
});

module.exports = routerTienda;//exportamos el router *?