'use-strict';

const chalk = require('chalk');

class Storage {
  constructor(object) {
    this.Hoek = require('hoek');
    this.analyticsStorage = {
      totals: {},
      status: {},
      requestData: [],
      responseCodes: {}
    };
    this.routes = {};
  }

  setRoutes(table) {
    let theTable = table[0].table;
    for (var i = theTable.length; i--;) {
      if (theTable[i].settings.tags && theTable[i].settings.tags.indexOf('analytics') > -1) {
        let route = {
          method: theTable[i].public.method,
          path: theTable[i].public.path,
          tags: theTable[i].settings.tags
        }
        if (!this.routes[route.path]) {
          this.routes[route.path] = route;
        }
      }
    }
  }

  getMemoryStorage () {
    return this.analyticsStorage;
  }

  clearMemoryStorage () {
    this.analyticsStorage = {
      totals: {},
      status: {},
      requestData: [],
      responseCodes: {}
    };
  }

  updateMemoryStorage (request) {
    if (this.Hoek.contain(this.routes, request.path, { deep: true }) === true) {
      this.updateTotal(request.path)
      this.updateResponseCodes(request.path, request.response.statusCode)
      this.updateRequestData(request);
      console.log(this.analyticsStorage);
    } else {
      return
    }
  }

  updateTotal(route) {
    if (this.analyticsStorage.totals[route]) {
      this.analyticsStorage.totals[route]++
    } else {
      this.analyticsStorage.totals[route] = 1;
    }
  }

  updateStatus() {
    // Run test to determine the status of api endpoints and set for each route
  }

  updateRequestData(request) {
    // console.log(request);
    let requestData = request.info;
    requestData["route"] = request.path
    this.analyticsStorage.requestData.push(requestData);
  }
  updateResponseCodes(route, statusCode) {
    let objectKey = route + '%' + statusCode;
    if (this.analyticsStorage.responseCodes[objectKey]) {
      this.analyticsStorage.responseCodes[objectKey]++
    } else {
      this.analyticsStorage.responseCodes[objectKey] = 1;
    }
  }
}

module.exports =  new Storage();
