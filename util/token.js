const _ = require('lodash');
const jwt = require('jsonwebtoken');
/*
 * @description: This is a utility class that works around jwt token.
 * @author: ketan kumar
 * @url: https://github.com/ketan-kumar/fynd-api
 */

 class Token {
   constructor() {}

   verify (users, tokenResult) {
    return new Promise(resolve => {
      if (JSON.stringify(users) === JSON.stringify(tokenResult))  {
        resolve(true);
      } else {
        resolve(false);
      }
    });
   }
 }

 module.exports = new Token();
