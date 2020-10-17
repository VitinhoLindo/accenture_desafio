const { Router } = require('express');
const { HtmlController } = require('../Http/Controllers');
const route = Router();

route.get('/', (request, response) => {
  HtmlController.using(request, response).get();
});

route.get('/:file', (request, response) => {
  HtmlController.using(request, response).get();
});

module.exports = route;