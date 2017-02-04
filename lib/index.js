'use-strict';
// Load modules
const Hoek = require('hoek');
const Path = require('path');
// Load objects
const Storage = require('./storage');
const System = require('./system');
// Declare internals
const internals = {};

// Register external plugin with server
exports.register = function (server, options, next) {
  internals.config = options;
  server.on('route', function(request, options) {
    let table = server.table();
    Storage.setRoutes(table);
    System.monitorSystemStats();
  });
  server.on('tail', function(request, options) {
    console.log('A request was recieved!');
    // console.log(request.response.statusCode);
    // console.log(internals.config);
    Storage.updateMemoryStorage(request)
  });
  next();
};

// Register external plugin attributes with server
exports.register.attributes = {
  pkg: require('../package.json')
};
