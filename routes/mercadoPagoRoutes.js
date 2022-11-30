const mercadoPagoController = require('../controllers/mercadoPagoController');
// const passport = require('passport');

module.exports = (app) => {


    app.post('/api/payments/create',  mercadoPagoController.createPayment);

}