const _ = require('lodash');

//utility classes
const Response = require('../../util/Response');
const messages = require('../../util/messages');
const codes = require('../../util/codes');

/*
 * @description: This class will handle all the functionality related to global middlewares.
 * @author: Ketan kumar
 * @url: https://github.com/ketan-kumar/fynd-api
 */

class Main {
  constructor () {}

  initialisation (req,  res, next) {
    next();
  }
}

module.exports = new Main();
