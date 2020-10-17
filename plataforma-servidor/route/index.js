const { Router } = require('express');
const { Root } = require('../api');

const route = Router();

route.use('/api/latter', Root);

module.exports = route;