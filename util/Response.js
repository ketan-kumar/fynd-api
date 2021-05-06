const _ = require('lodash');

//utility classes
const Messages = require('./messages');


/*
 * @description: This is class that holds the utility function that works around https response.
 * @author: ketan kumar
 * @url: https://github.com/ketan-kumar/fynd-api
 */

 class Response {
   constructor() {}

   send (res, status='', data, send=true) {
     if (!res) throw new Error(Messages.RES_IS_EMPTY);
     if (typeof res !== 'object') throw new Error(Messages.RES_MUST_BE_OBJ);
     if (send) {
       res.status(status);
       res.json(data);
     }
   }

  removeNativeKeys (response) {
    const nativeKeys = ['__v', '_id', 'iat'];
    _.map(Object.keys(response), key => {
      if (nativeKeys.indexOf(key) !== -1) {
        delete response[key];
      }
    });
    return response;
  }
 }

 module.exports = new Response();
