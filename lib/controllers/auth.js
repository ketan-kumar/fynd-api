const _ = require('lodash');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

//utility classes
const Response = require('../../util/Response');
const Messages = require('../../util/messages');
const Codes = require('../../util/codes');
const Token = require('../../util/token');

// models
const _users = require('../models/users');

/*
 * @description: This class will handle all the functionality related to user auth.
 * @author: Ketan kumar
 * @url: https://github.com/ketan-kumar/fynd-api
 */

class Auth {
  constructor () {}

  async fetchUsers (req, res, next, send=true) {
    return new Promise(resolve => {
      try {
        _users.find().exec().then(doc => {
          console.log('[info][Auth][fetchUsers] users fetched successfully!!', doc);
          Response.send(res, 200, {
            status: Codes.SUCCESS,
            data: doc,
            msg: Messages.FETCHED_RECORDS
          }, send);
          resolve(doc);
        }).catch(err => {
          console.log('[error][Auth][fetchUsers] error while fetching users', err);
          Response.send(res, 500, {
            status: Codes.INTERNAL_ERROR,
            data: [],
            msg: Messages.RECORDS_CANT_BE_FETCHED
          }, send);
          resolve({});  
        });
      } catch (err) {
        console.log('[error][Auth][fetchUsers] error while fetching users', err);
        Response.send(res, 500, {
          status: Codes.INTERNAL_ERROR,
          data: [],
          msg: Messages.RECORDS_CANT_BE_FETCHED
        }, send);
        resolve({});
      }
    });
  }
  
  async findOneUsers (req, res, next, send=true) {
    return new Promise(resolve => {
      try {
        const email = (req.body.userToFind) ? req.body.userToFind : req.body.email || '';
        if (!email) throw Messages.RECORDS_CANT_BE_FETCHED;
        _users.findOne({email: email}).lean().exec().then(doc => {
          console.log('[info][Auth][fetchUsers] user fetched successfully!!', doc);
          Response.send(res, 200, {
            status: Codes.SUCCESS,
            data: doc,
            msg: Messages.FETCHED_RECORDS
          }, send);
          resolve(doc);
        }).catch(err => {
          console.log('[error][Auth][fetchUsers] error while fetching users', err);
          Response.send(res, 500, {
            status: Codes.INTERNAL_ERROR,
            data: [],
            msg: Messages.RECORDS_CANT_BE_FETCHED
          }, send);
          resolve({});  
        });
      } catch (err) {
        console.log('[error][Auth][fetchUsers] error while fetching users', err);
        Response.send(res, 500, {
          status: Codes.INTERNAL_ERROR,
          data: [],
          msg: Messages.RECORDS_CANT_BE_FETCHED
        }, send);
        resolve({});
      }
    });
  }

  async generateToken (req, res, next, send=true) {
    return new Promise(async resolve  => {
      try {
        const {
          email
        } = req.body;
        if (!email) throw Messages.TOKEN_CANT_BE_GENERATED;
        const users = await new Auth().findOneUsers(req, res, next, false);
        if (!users || _.isEmpty(users)) throw Messages.TOKEN_CANT_BE_GENERATED;
        const {
          name,
          role
        }  = users;
        const token = jwt.sign(
          {
            email,
            name,
            role
          },
          process.env.CERT
        );
        if (!token) throw Messages.TOKEN_CANT_BE_GENERATED;
        users.token = token;
        req.body.users = users;
        console.log('[info][Auth][generateToken] token generated successfully: ', req.body.users);
        Response.send(res, 200, {
          status: Codes.SUCCESS,
          data: req.body.users,
          msg: Messages.TOKEN_GENERATED
        }, send);
        resolve(req.body.users);
      } catch(err) {
        console.log('[error][Auth][generateToken] getting error while generating token: ', err);
        Response.send(res, 500, {
          status: Codes.INTERNAL_ERROR,
          data: [],
          msg: Messages.TOKEN_CANT_BE_GENERATED
        }, send);
        resolve({});
      }
    });
  }

  async login (req, res, next, send=true) {
    return new Promise(async resolve => {
      try {
        const result = await new Auth().generateToken(req, res, next, false);
        if (!result || _.isEmpty(result)) throw Messages.LOGIN_FAILED;
        console.log('[info][Auth][authentication] user login successfully!!', result);
        Response.send(res, 200, {
          status: Codes.SUCCESS,
          data: result,
          msg: Messages.LOGIN_SUCCESS
        }, send);
        resolve(result);
      } catch (err) {
        console.log('[err][Auth][authentication] error while login user: ', err);
        Response.send(res, 500, {
          status: Codes.INTERNAL_ERROR,
          data: [],
          msg: Messages.LOGIN_FAILED
        }, send);
        resolve({});
      }
    });
  }

  async signup (req, res, next, send=true) {
    return new Promise(async resolve => {
      try {
        const {
          email,
          name,
          role
        } = req.body;
        if (!email || !name || !role) throw Messages.INVALID_SIGNUP_IINFORMATION;
        new Auth().addUser(req, res, next, false).then(doc => {
          console.log('[info][Auth][authentication] user signup successfully!!', doc);
          Response.send(res, 200, {
            status: Codes.SUCCESS,
            data: doc,
            msg: Messages.SIGNUP_SUCCESS
          }, send);
          resolve(doc);
        }).catch(err  => {
          console.log('[err][Auth][authentication] error while signup user: ', err);
          Response.send(res, 500, {
            status: Codes.INTERNAL_ERROR,
            data: [],
            msg: Messages.SIGNUP_FAILED
          }, send);
          resolve({});
        });
      } catch (err) {
        console.log('[err][Auth][authentication] error while signup user: ', err);
        Response.send(res, 500, {
          status: Codes.INTERNAL_ERROR,
          data: [],
          msg: Messages.SIGNUP_FAILED
        }, send);
        resolve({});
      }
    });
  }
  
  async authenticate (req, res, next, send=true) {
    return new Promise(async resolve => {
      try {
        const {
          authorization
        } = req.headers;
        const token = authorization && authorization.split(' ')[1];
        if (!token || token == '') throw Messages.AUTHENTICATION_FAILED;
        const tokenResult  = jwt.verify(token, process.env.CERT);
        req.body.userToFind = tokenResult.email;
        const users = await new Auth().findOneUsers(req, res, next, false);
        if (!users || _.isEmpty(users)) throw Messages.AUTHENTICATION_FAILED;
        const filteredUsers = Response.removeNativeKeys(users);
        const filteredTokenResult = Response.removeNativeKeys(tokenResult);
        const isMatched = Token.verify(filteredUsers, filteredTokenResult);
        if (!isMatched) throw Messages.AUTHENTICATION_FAILED;
        console.log('[info][Auth][authentication] user authenticated successfully!!', users);
        resolve(users);
        next();
      } catch (err) {
        console.log('[err][Auth][authentication] error while authenticating user: ', err);
        Response.send(res, 500, {
          status: Codes.INTERNAL_ERROR,
          data: [],
          msg: Messages.AUTHENTICATION_FAILED
        }, send);
        resolve({});
      }
    });
  }
  
  async addUser (req, res, next, send=true) {
    return new Promise(async resolve => {
      try {
        const {
          name,
          email,
          role
        }  = req.body
        const user = new _users({
          _id: new mongoose.Types.ObjectId(),
          name,
          email,
          role
        });
        user.save().then(doc => {
          console.log('[info][Auth][addUser] user added successfully!!', doc);
          Response.send(res, 200, {
            status: Codes.SUCCESS,
            data: doc,
            msg: Messages.SAVED_RECORDS
          }, send);
          resolve(doc);
        }).catch(err => {
          console.log('[err][Auth][addUser] error while adding user: ', err);
          Response.send(res, 500, {
            status: Codes.INTERNAL_ERROR,
            data: [],
            msg: Messages.RECORDS_CANT_BE_SAVED
          }, send);
          resolve({});
        });
      } catch (err) {
        console.log('[err][Auth][addUser] error while adding user: ', err);
        Response.send(res, 500, {
          status: Codes.INTERNAL_ERROR,
          data: [],
          msg: Messages.RECORDS_CANT_BE_SAVED
        }, send);
        resolve({});
      }
    });
  }
}

module.exports = new Auth();
