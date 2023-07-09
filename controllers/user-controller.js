const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

function getLoginPage(req, res) {
  res.render('login');
}

function login(req, res) {
  return passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })(req, res);
}

function getSignupPage(req, res) {
  res.render('register');
}

function register(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' });
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' });
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' });
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword,
      });
    }
    return bcrypt
      .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
      .then((salt) => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
      .then((hash) =>
        User.create({
          name,
          email,
          password: hash, // 用雜湊值取代原本的使用者密碼
        })
      )
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err));
  });
}

function logout(req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
}

module.exports = { getLoginPage, login, getSignupPage, register, logout };
