const Router = require('../../route');
const Http = require('../../Http');
const express = require('express');
const { request } = require('express');

module.exports = (server = express(), app = Http()) => {
  setInterval(() => { resetRequests(); }, 60000);

  var requests = {
    countable: 0,
    max: app.getMaxRequestMinute()
  };

  const openToRequest = () => {
    return requests.countable == requests.max;
  }

  const newRequest = () => {
    requests.countable++;
  }

  const resetRequests = () => {
    requests.countable = 0;
  }

  const body = (_request = request, _response = response) => {
    return new Promise((resolve) => {
      var data = '';

      _request.on('data', (chunk) => { if (chunk) data += chunk.toString('utf-8'); });
      _request.on('end', () => {
        try { _request.body = JSON.parse(data); }
        catch (error) { _request.body = {}; }
        resolve(true);
      });
    });
  };

  const getApp = () => {
    return app;
  }

  const middleware = async (_request = request, _response = response, next) => {
    _response.setHeader('Access-Control-Allow-Origin', '*');
    _response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    _response.setHeader('Access-Control-Allow-Headers', '*');
    _response.setHeader('Access-Control-Allow-Credentials', false);

    if (openToRequest()) {
      app.emit('print', [{ message: `too many requests:`, color: 'red' }, { message: `${_request.method.toLocaleUpperCase()}`, color: 'yellow' }, { message: `${_request.url}`, color: 'cyan' }]);
      _response.status(200);
      _response.json({ code: 429, message: 'Too Many Requests', result: null, status: 'success' });
      return _response.end();
    }
    newRequest();
    app.emit('print', [{ message: `new request in route:`, color: 'green' }, { message: `${_request.method.toLocaleUpperCase()}`, color: 'yellow' }, { message: `${_request.url}` }]);

    await body(_request, _response);

    // _request.__dirname = app.dirname;
    _request.getApp = getApp;
    next();
  };

  server.use(middleware);
  server.use(Router);
};