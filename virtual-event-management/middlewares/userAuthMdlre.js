const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

function verifyToken(req, res, next) {
  const jwtSecret = process.env.API_SECRET;
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      req.user = undefined;
      req.status = 401;
      res.message = 'Token not found, please Login!';
      return next();
    }
    jwt.verify(token, jwtSecret, (error, decodedString) => {
      // if (error && error.message === "jwt expired") {
      //   return res.status(302).json("Token expired, redirect to login!");
      // }
      if (error) {
        req.user = undefined;
        req.status = 401;
        res.message = 'Login with correct password!';
        return next();
      }
      User.findOne({ _id: decodedString.id })
        .then(user => {
          if (!user) {
            req.user = undefined;
            req.status = 404;
            res.message = 'User not found!';
            return next();
          }
          req.user = user;
          req.status = 200;
          res.message = 'User found!';
          return next();
        })
        .catch((/* err */) => {
          req.user = undefined;
          req.status = 500;
          res.message = 'Error finding user! '; // + err;
          return next();
        });
    });
  } else {
    req.user = undefined;
    req.status = 401;
    res.message = 'Authorization Header not found, please Login!';
    return next();
  }
}

module.exports = { verifyToken };
