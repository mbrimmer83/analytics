'use strict';

// Main routes file. We gather all the routes here to give to server
const assets = require('./assets');
const queries = require('./mainRoutes');

// conact them all into an array
module.exports = [].concat(assets, queries);
