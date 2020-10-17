const MyEvent = require('./Event')

class Modules extends MyEvent {
  http    = require('http');
  https   = require('https');
  express = require('express')();
  process = require('process');

  constructor() { super(); }
}

module.exports = Modules;