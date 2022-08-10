// route: api/todo/search

const { Router } = require('express');
const { searches, getDocsCollection } = require('../controllers/searches.controller');
const { validateToken } = require('../middleware/validate-jwt');

const route = Router();

route.get('/:busqueda', validateToken, (searches));
route.get('/coleccion/:tabla/:busqueda', validateToken, (getDocsCollection));

module.exports = route;