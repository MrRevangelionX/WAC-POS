const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((error)=>{
    if(error){
        console.error('El error de conexion es: ' + error);
        return;
    }
    console.log('Conectado correctamente a la DB');
});
module.exports = connection;