'use strict';

const Joi = require('joi');
const routeHandler = require('../handlers/mainHandler');

module.exports = [{
  method: 'GET',
  path: '/analytics',
  config: {
    handler: routeHandler.mainHandler,
    notes: 'Test route for the analytics plugin!',
    tags: ['api', 'analytics']
  }
}, {
  method: 'GET',
  path: '/test',
  config: {
    handler: routeHandler.mainHandler,
    notes: 'Test route for the analytics plugin!',
    tags: ['api', 'analytics']
  }
}, {
  method: 'GET',
  path: '/anothertest',
  config: {
    handler: routeHandler.mainHandler,
    notes: 'Test route for the analytics plugin!',
    tags: ['api', 'analytics']
  }
}]
