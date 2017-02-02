'use-strict';

const chalk = require('chalk');

exports.mainHandler = (request, reply) => {
  console.log(chalk.blue('Request recieved!'));
  reply('Your request was recieved!');
  console.log(chalk.green('Reply sent!'));
}
