const express = require('express');
const router = express.Router();
const {
  getLoginPage,
  login,
  getSignupPage,
  register,
  logout,
} = require('../../controllers/user-controller');

router.get('/login', getLoginPage);
router.post('/login', login);
router.get('/register', getSignupPage);
router.post('/register', register);
// https://stackoverflow.com/questions/72336177/error-reqlogout-requires-a-callback-function
router.get('/logout', logout);

module.exports = router;
