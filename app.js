// INVOCAMOS A EXPRESS
const express = require('express');
const app = express();

// URLENCODED PARA CAPTURAR DATOS DE FORMULARIOS Y JSON
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// INVOCAMOS A DOTENV
const dotenv = require('dotenv');
dotenv.config({path: './env/.env'});

// DEFIINMOS EL DIRECTORIO PUBLIC
// app.use('/resourses', express.static('public'));
app.use(express.static(__dirname + '/public'));

// ESTABLECER MOTOR DE PLANTILLAS EJS
app.set('view engine', 'ejs');

// INVOCAMOS A bcryptjs
const bcrypt = require('bcryptjs');

// VAR. DE SESIONES
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// INVOCAMOS AL MODULO DE CONECCION CON LA DB
const connection = require('./database/db');

// ESTABLECIENDO RUTAS

app.get('/', (req, res)=>{
    if (req.session.auth_token) {
        res.render('index')
    }else{
        res.redirect('/login')
    }
})
app.get('/login', (req, res)=>{
    res.render('login')
})

app.listen(3000, (req, res)=>{
    console.log('Server Running in http://localhost:3000/');
})