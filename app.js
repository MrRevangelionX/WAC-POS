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
        connection.query('SELECT * FROM main_screen', function(error,results,fields){
            if(error){
                throw error
            }
            // results.forEach(result => {
            //     console.log(result);
            // });
            res.render('index', {
                Botones: results
            });
        })
    }else{
        res.redirect('/login')
    }
})

app.get('/login', (req, res)=>{
    res.render('login')
})

app.post('/auth', (req, res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    if (user && pass) {
		connection.query('SELECT * FROM WAC.wac_usuarios WHERE username = ? AND pass = ?;', [user, pass], (err, results, fields)=> {
            if(err){
                throw err;
            }else{
                if( results.length == 0 || results == null ) {    
                    res.render('login', {
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "USUARIO y/o PASSWORD incorrectas",
                            alertIcon:'error',
                            showConfirmButton: true,
                            timer: false,
                            ruta: 'login'    
                        });
                }else{
                    // console.log("SI LOGGUEO");
                    req.session.auth_token = true;
                    req.session.user = results[0].username
                    req.session.name = results[0].usrName
                    req.session.role = results[0].usrRole
                    res.render('login', {
                        alert: true,
                        alertTitle: "CORRECTO",
                        alertMessage: "Inicio Sesion Correctamente!",
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: ''    
                    });
                }
            }
		});
	}
})

app.get('/mesas', (req, res)=>{
    if (req.session.auth_token) {
        connection.query('SELECT * FROM wac_mesas', function(error,results,fields){
            if(error){
                throw error
            }
            res.render('mesas', {
                Mesas: results
            });
        })
    }
})

app.get('/inventario', (req, res)=>{
    if (req.session.auth_token) {
        connection.query('SELECT * FROM wac_inventario', function(error,results,fields){
            if(error){
                throw error
            }
            res.render('inventario', {
                Items: results
            });
        })
    }
})

app.post('/mesa/:id', (req, res)=>{
    const { id } = req.params;
    if(req.session.auth_token){
       connection.query("UPDATE WAC.wac_mesas SET mesa_status = 'Libre' WHERE mesa_id = ?;", [id], (err, resp, fields)=>{
        if(err){
            throw err;
        }
        res.render("menu");
       });
    }
})

app.get('/menu', (req, res)=>{
    if (req.session.auth_token) {
        res.render('menu');
    }
})


//función para limpiar la caché luego del logout
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

//Logout
//Destruye la sesión.
app.get('/logout', function (req, res) {
	req.session.destroy(() => {
	    res.redirect('/')
	})
});

app.listen(3000, (req, res)=>{
    console.log('Server Running in http://localhost:3000/');
})