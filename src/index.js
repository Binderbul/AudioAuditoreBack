const express = require('express');//usamos el modulo de express y lo ponemos en una constante
const app = express();//objeto app (servidor) que carga a express
const morgan = require('morgan');//usamos el modulo de morgan u lo ponemos en una constante
const cors = require('cors');

const path = require('path');//modulo de path, incluido en node.js, ayuda a encontrar rutas independientemente del SO 
const { mongoose } = require('./database');//usamos del archivo database, el modulo de mongoose

// Settings, seccion de configuracion
app.set('port', process.env.PORT || 3777);//Toma el puerto que asigne la nube, O toma por defecto el puerto 3000 
app.use(cors());
app.options('*',cors());


// Middlewares, acciones que se ejecutan con cada peticion
app.use(morgan('dev'));//con el formato "dev" que permite ver las peticiones para desarrollo:  GET / 404 4.415 ms - 139; GET - tipo de peticion; / - ruta; 404 - respuesta; ms - tiempo de respuesta; 139 - peso de la respuesta en bytes
app.use(express.json());//comprueba que el dato recibido sea un json y lo parsea, reemplaza a body parser

// Routes, urls del servidor
app.use('/api/tasks', require('./routes/task.routes.js'));//usamos el archivo de rutas en el servidor, '/api/tasks' es un prefijo de ruta *?
app.use('/api/tiendas', require('./routes/tienda.routes.js'));
app.use('/api/comentarios', require('./routes/comentarios.routes.js'));

// Static files, carpeta public
//console.log(__dirname);//vemos la constante __dirname, que es la ruta de la direccion de index.js
//console.log(path.join(__dirname,'public'));//concatena la ruta con otro folder
//app.use(express.static(path.join(__dirname,'public')));//indicamos la carpeta de archivos estaticos

// Server star, Iniciamos el servidor en el puerto designado
app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en el puerto ${app.get('port')}`);
});