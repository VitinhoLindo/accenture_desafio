const { Router } = require('express');
const { CssController } = require('../Http/Controllers');

const route = Router();

route.get('/:file', (request, response) => {
  CssController.using(request, response).get();
});

module.exports = route;