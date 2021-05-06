
/*
 * @description: This is a single place where we define the error messages to maintain the coding standard.
 * @author: Ketan kumar
 * @url: https://github.com/ketan-kumar/fynd-api
 */

const messages  = {
  AUTHENTICATION_SUCCESS: "Authentication succedded!",
  AUTHENTICATION_FAILED: "Authentication failed!",
  LOGIN_SUCCESS: "Login succedded!",
  LOGIN_FAILED: "Login failed!",
  SIGNUP_SUCCESS: "Signup succedded!",
  SIGNUP_FAILED: "Signup failed!",
  INVALID_SIGNUP_IINFORMATION: 'Invalid details to signup!',
  FETCHED_RECORDS:  "Records fetched successfully!",
  SAVED_RECORDS:  "Records saved successfully!",
  INTERNAL_ERROR: "Internal error ocured",
  RECORDS_CANT_BE_FETCHED: "Records can't be fetched at the moment",
  RECORDS_CANT_BE_SAVED: "Records can't be saved at the moment",
  DELETE_RECORDS: "Records deleted successfully!",
  RECORDS_CANT_BE_DELETED: "Records can't be deleted at the moment!",
  UPDATE_RECORDS: "Records UPDATED successfully!",
  RECORDS_CANT_BE_UPDATED: "Records can't be updated at the moment!",
  TOKEN_CANT_BE_GENERATED: "Token can't be generated at the moment!",
  TOKEN_GENERATED: "Token generated successfully!",
  RES_IS_EMPTY: 'Response can not be empty',
  RES_MUST_BE_OBJ: 'Response must be of object type',
  NOT_AN_ARRAY_OR_OBJECT: 'Response must be an array or object to filter'
}

module.exports = messages;