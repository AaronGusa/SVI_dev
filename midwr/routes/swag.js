const swag_r = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swagDoc = require('../../swagger.json');

swag_r.use('/', swaggerUi.serve);
swag_r.get('/', swaggerUi.setup(swagDoc));

module.exports = swag_r;