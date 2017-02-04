'use-strict';

class System {
  constructor() {
    this.pusage = require('pidusage');
  }

  monitorSystemStats() {
    this.pusage.stat(process.pid, function(err, stat) {
      if (err) {
        console.log('There is a system err!', err.message);
        return;
      }
      if (typeof stat === 'object' && stat.cpu && stat.memory) {
        console.log('Pcpu: %s', stat.cpu)
        console.log('Mem: %s', stat.memory) //those are bytes
      } else {
        return
      }
    });
    // Unmonitor process
    this.pusage.unmonitor(process.pid);
  }
}

module.exports = new System();
