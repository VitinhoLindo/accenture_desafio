const { Router } = require('express');

const route = Router();

route.get('/', (request, response) => {
  response.end();
});

module.exports = route;