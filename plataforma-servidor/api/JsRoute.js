const { Router } = require('express');
const { JsController } = require('../Http/Controllers');

const route = Router();

route.get('/:file', (request, response) => {
  JsController.using(request, response).get();
});

module.exports = route;