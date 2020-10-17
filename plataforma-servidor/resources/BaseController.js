const express = require('express');
const Validator = require('./Validator');

class ResponseModel {
  requestStatus = 0;
  requestMessage = '';
  time = 0;
  message = '';
  result = {};
  code = 0;
  status = '';

  constructor() { }
}

const currentTime = function () {
  return new Date().getTime();
}

class BaseController {
  request = express.request;
  response = express.response;
  Validator = Validator;
  app = require('../Http')();

  constructor(_request, _response) {
    this.request = _request;
    this.response = _response;
    this.app = _request.getApp();
  }

  all() {
    return Object.assign({}, this.request.query, this.request.params, this.request.body);
  }

  _user() {
    return this.app.getUser(this.request);
  }

  setStatus(code) {
    this.response.status(code);
  }

  setMessage(message) {
    this.response.statusMessage = message;
  }

  resJson(data) {
    this.response.json(data);
    return data;
  }

  resEnd() {
    this.response.end();
  }

  defaultResponseJSON(_response = new ResponseModel) {
    if (!_response.requestStatus) _response.requestStatus = 200;
    if (!_response.requestMessage) _response.requestMessage = 'Success';
    if (!_response.time) _response.time = currentTime();
    if (!_response.message) _response.message = 'Success response message';
    if (!_response.code) _response.code = 200;
    if (!_response.result) _response.result = {};
    if (!_response.status) _response.status = (
      _response.code >= 200 &&
      _response.code < 300
    ) ? 'success' : 'error';

    this.setStatus(_response.requestStatus);
    this.setMessage(_response.requestMessage);
    this.resJson({
      time: _response.time,
      message: _response.message,
      code: _response.code,
      status: _response.status,
      result: _response.result
    });
    this.resEnd();
  }

  static using(_request, _response) {
    return new (this.estance())(_request, _response);
  }

  sendFile(path) {
    console.log(path);
    this.response.sendFile(path, (err) => {
      if (err == undefined) this.resEnd();
      else {
        this.defaultResponseJSON({
          code: 404,
          message: 'error in response file'
        });
        this.resEnd();
      }
    });
  }
}

module.exports = BaseController;