// PRIMERO. esta aplicacion INICIA TODO
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();

// importando routes
const customerRoutes = require('./routes/customer');
const { urlencoded } = require('express');

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares  -- SEGUNDO. esto inicia conexion con Mysql
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'articulosdb'
}, 'single'));

// desde el modulo "express" estamos requiriendo un metodo que nos va a permitir entender todos los DATOS que vengan del FORMULARIO. {extend: false} es porque no nos va a enviar imagenes, ni datos codificados
app.use(express.urlencoded({extended: false}));


// routes TERCERO. aqui colocamos las rutas
app.use('/', customerRoutes);


// static files
// para colocar imagenes, frameworks, archivos css, codigo js de frontednd
app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), ()=>{
    console.log('Server on port 3000');
});