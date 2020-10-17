const { Router } = require('express');
const { RootController } = require('../Http/Controllers')

const route = Router();

route.get('/', (request, response) => {
  RootController.using(request, response).get();
});

module.exports = route;