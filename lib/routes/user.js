const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controllers/auth');
const mainController = require('../controllers/main');

// Global middlewares
router.use(mainController.initialisation);

// to fetch users
router.get('/',
  authController.authenticate,
  authController.fetchUsers
);

// to login users
router.post('/login',
  authController.login
);

// to signup users
router.post('/signup',
  authController.signup
);

// to save users
router.post('/add',
  authController.authenticate,
  authController.addUser
);

module.exports = router;
