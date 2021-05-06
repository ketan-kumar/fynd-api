const _ = require('lodash');
const mongoose = require('mongoose');

//utility classes
const Response = require('../../util/Response');
const Messages = require('../../util/messages');
const Codes = require('../../util/codes');

// models
const _movies = require('../models/movies');

/*
 * @description: This class will handle all the functionality related to Movies. (eg: fetch,update,delete movies)
 * @author: Ketan kumar
 * @url: https://github.com/ketan-kumar/fynd-api
 */

class Movies {
  constructor () {}

  fetchMovies (req, res, next, send=true) {
    return new Promise(resolve => {
      _movies.find().exec().then(doc => {
        console.log('[info][Movies][fetchMovies] movie details fetched successfully', doc);
        Response.send(res, 200, {
          status: Codes.SUCCESS,
          data: doc,
          msg: Messages.FETCHED_RECORDS
        }, send);
        resolve(doc);
      }).catch(err => {
        console.error('[error][Movies][fetchMovies] getting error while fetching movies detail:', err);
        Response.send(res, 500, {
          status: Codes.ERROR,
          data: [],
          msg: Messages.RECORDS_CANT_BE_FETCHED
        }, send);
        resolve({});
      });
    });
  }

  saveMovies (req, res, next, send=true) {
    return new Promise(resolve => {
      try{
        const {
          popularity_99,
          director,
          genre,
          imdb_score,
          name,
          admin
        } = req.body;
        const movie = new _movies({
          _id: new mongoose.Types.ObjectId(),
          popularity_99,
          director,
          genre,
          imdb_score,
          name,
          admin
        });
        movie.save().then(doc => {
          console.log('[info][Movies][saveMovies] movie saved to db successfully', doc);
          Response.send(res, 200, {
            status: Codes.SUCCESS,
            data: doc,
            msg: Messages.SAVED_RECORDS
          }, send);
          resolve(doc);
        }).catch(err => {
          console.error('[error][Movies][saveMovies] getting error while saving movies to db:', err);
          Response.send(res, 500, {
            status: Codes.ERROR,
            data: [],
            msg: Messages.RECORDS_CANT_BE_SAVED
          }, send);
          resolve({});
        });
      } catch (err) {
        console.error('[error][Movies][saveMovies] getting error while saving movies to db:', err);
          Response.send(res, 500, {
            status: Codes.ERROR,
            data: [],
            msg: Messages.RECORDS_CANT_BE_SAVED
          }, send);
          resolve({});
      }
    });
  }

  updateMovies (req, res, next, send=true) {
    return new Promise(resolve => {
      try {
        const {
          id,
          popularity_99,
          director,
          genre,
          imdb_score,
          name,
          admin
        } = req.body;
        if (!id) throw Messages.RECORDS_CANT_BE_UPDATED;
        _movies.updateOne(
          {_id: id},
          {$set: {
            popularity_99,
            director,
            genre,
            imdb_score,
            name,
            admin
          }}).exec().then(doc => {
          console.log('[info][Movies][deleteMovies] movie updated into db successfully:', doc);
          Response.send(res, 200, {
            status: Codes.SUCCESS,
            data: doc,
            msg: Messages.UPDATE_RECORDS
          }, send);
          resolve(doc);
        }).catch(err => {
          console.log('[error][Movies][deleteMovies] getting error while deleting movie from db successfully:', err);
          Response.send(res, 500, {
            status: Codes.ERROR,
            data: [],
            msg: Messages.RECORDS_CANT_BE_UPDATED
          }, send);
          resolve({});
        });
      } catch (err) {
        console.log('[error][Movies][deleteMovies] getting error while deleting movie from db successfully:', err);
        Response.send(res, 500, {
          status: Codes.ERROR,
          data: [],
          msg: Messages.RECORDS_CANT_BE_UPDATED
        }, send);
        resolve({});
      }
    });
  }
  
  deleteMovies (req, res, next, send=true) {
    return new Promise(resolve => {
      try{
        const {
          id
        } = req.params;
        if (!id) throw Messages.RECORDS_CANT_BE_DELETED;
        _movies.deleteOne({_id: id}).exec().then(doc => {
          console.log('[info][Movies][deleteMovies] movie deleted from db successfully:', doc);
          Response.send(res, 200, {
            status: Codes.SUCCESS,
            data: doc,
            msg: Messages.DELETE_RECORDS
          }, send);
          resolve(doc);
        }).catch(err => {
          console.log('[error][Movies][deleteMovies] getting error while deleting movie from db successfully:', err);
          Response.send(res, 500, {
            status: Codes.ERROR,
            data: [],
            msg: Messages.RECORDS_CANT_BE_DELETED
          }, send);
          resolve({});
        });
      } catch (err) {
        console.log('[error][Movies][deleteMovies] getting error while deleting movie from db successfully:', err);
          Response.send(res, 500, {
            status: Codes.ERROR,
            data: [],
            msg: Messages.RECORDS_CANT_BE_DELETED
          }, send);
          resolve({});
      }
    });
  }
}

module.exports = new Movies();
