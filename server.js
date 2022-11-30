const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

const mercadopago = require('mercadopago');
mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-2707071825836861-112611-73cafa3078b68719856d01f2371bee57-363047618'
});


/*
* IMPORTAR RUTAS
*/

// const ordersRoutes = require('./routes/orderRoutes');
const mercadoPagoRoutes = require('./routes/mercadoPagoRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use(cors());
app.disable('x-powered-by');
app.set('port', port);


// /*
// * LLAMADO DE LAS RUTAS
// */
// usersRoutes(app, upload);
// categoriesRoutes(app);
// addressRoutes(app);
// productRoutes(app, upload);
// ordersRoutes(app);
mercadoPagoRoutes(app);


// server.listen(3000, 'https://backendyoyomitlnodejs.up.railway.app' || 'localhost', function() {
//     console.log('Aplicacion de NodeJS ' + port + ' Iniciada...')
// });


// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

app.get('/',  (req, res) => {
    res.send('Ruta raiz del backend');
});


module.exports = {
    app: app,
    server: server
}

// 200 - ES UN RESPUESTA EXITOSA
// 404 - SIGNIFICA QUE LA URL NO EXISTE
// 500 - ERROR INTERNO DEL SERVIDOR