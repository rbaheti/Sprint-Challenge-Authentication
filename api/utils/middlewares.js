const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/userModels');
const { mysecret } = require('../../config');
const saltRounds = 11;

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, mysecret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      error: 'No token provided, must be set on the Authorization Header'
    });
  }
};

const sendUserError = (err, res) => {
  res.status(STATUS_USER_ERROR);
  if (err && err.message) {
    res.json({ message: err.message, stack: err.stack });
  } else {
    res.json({ error: err });
  }
};

const encryptUserPW = (req, res, next) => {
  const { username, password } = req.body;
  // https://github.com/kelektiv/node.bcrypt.js#usage
  // TODO: Fill this middleware in with the Proper password encrypting, bcrypt.hash()
  // Once the password is encrypted using bcrypt, you'll need to save the user the DB.
  // Once the user is set, take the savedUser and set the returned document from Mongo on req.user
  // call next to head back into the route handler for encryptUserPW
  // Encrypt the PW first and set the user object on `req.user` then call `next` 
  // and handle saving that user in the `userController`
  if (!username) {
    sendUserError('Gimme a username', res);
    return;
  }
  if (!password) {
    sendUserError('Gimme a password', res);
    return;
  }
  bcrypt
    .hash(password, saltRounds)
    .then((pwd) => {
      const newUser = new User({username, password: pwd});
      req.user = { username, password: pwd };;
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const compareUserPW = (req, res, next) => {
  const { username, password } = req.body;
  // https://github.com/kelektiv/node.bcrypt.js#usage
  // TODO: Fill this middleware in with the Proper password comparing, bcrypt.compare()
  // You'll need to find the user in your DB
  // Once you have the user, you'll need to pass the encrypted pw and the plaintext pw to the compare function
  // If the passwords match set the username on `req` ==> req.username = user.username; and call next();

  User.findOne({username})
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((compareOutput) => {
          if(!compareOutput) throw new Error;
          req.username = user.username;
          next();
        })
        .catch(err => {
          throw new Error(err);
        });
    });
};

module.exports = {
  authenticate,
  encryptUserPW,
  compareUserPW
};
