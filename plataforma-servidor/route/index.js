const { Router } = require('express');
const { Root, Js, Css, Html } = require('../api');

const route = Router();

route.use('/api/latter', Root);
route.use('/js/', Js);
route.use('/css/', Css);
route.use('/', Html);

module.exports = route;