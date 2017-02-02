'use strict';

// Load ENV vars
require('dotenv').config();

// Main modules
const Hapi = require('hapi'),
  HapiSwagger = require('hapi-swagger'),
  Inert = require('inert'),
  Vision = require('vision'),
  Analytics = require('./lib/index');

// configs
const routes = require('./configs/routes');

// New Hapi server object
const server = new Hapi.Server();

// Say what port to default to if none given
server.connection({
  port: process.env.PORT || 8282,
  host: '0.0.0.0'
});

let swaggerOptions = {
  basePath: '/',
  pathPrefixSize: 2,
  info: {
    'title': 'Hamilton API Documentation',
    'description': 'Hamilton API is sweet',
    'version': '1.0',
    'license': {
      'name': 'MIT',
      'url': 'https://bitbucket.org/merchante-solutions/hapi-reporting/raw/41ffc23b3689ffc364864ac72f30473d9e62afe4/LICENSE.md'
    }
  },
  tags: [{
    'name': 'query1',
    'description': 'Generates a query'
  }, {
    'name': 'query2',
    'description': 'Generates a query'
  }, {
    'name': 'query5',
    'description': '5 MF'
  }]
};

// Register hapi plugins. Give options if wanted
server.register([Vision, Inert, {
  'register': Analytics,
  'options' : {
    logging: true,
    timedEvents: {
      database: 12,
      fileSystem: 1
    }
  }
}, {
  'register': HapiSwagger,
  'options': swaggerOptions
}], (err) => {
  if (err) {
    throw err
    console.log('Oh shit!');
  }

  // Give server object access to routes
  server.route(routes);

  // For orcale so that we can kill or stop server
  process
    .on('SIGTERM', function() {
      console.log("\nTerminating");
      process.exit(0);
    })
    .on('SIGINT', function() {
      console.log("\nTerminating");
      process.exit(0);
    });

  server.start(() => {
    console.log('Server running on: ' + server.info.uri);
  });
});

// export our sever for various resons -- testing perhaps?
module.exports = server;
