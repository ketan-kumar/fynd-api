const _ = require('lodash');

const errors = {
  RES_IS_EMPTY: 'Response can not be empty',
  RES_MUST_BE_OBJ: 'Response must be of object type',
  NOT_AN_ARRAY_OR_OBJECT: 'Response must be an array or object to filter',
}


/*
 * @description: This is class that holds the utility function that works around https response.
 * @author: ketan kumar
 * @url: https://github.com/ketan-kumar/fynd-api
 */

 class Response {
   constructor() {}

   send (res, status='', data, send=true) {
     if (!res) throw new Error(errors.RES_IS_EMPTY);
     if (typeof res !== 'object') throw new Error(errors.RES_MUST_BE_OBJ);
     if (send) {
       res.status(status);
       res.json(data);
     }
   }
 }

 module.exports = new Response();
