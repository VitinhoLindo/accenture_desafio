const { Router } = require('express');
const { Root } = require('../api');

const route = Router();

route.use('/', Root);

module.exports = route;