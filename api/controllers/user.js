const User = require('../models/userModels');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
  // there should be a user object set on req
  // use that req.user object to create a user and save it to our Mongo instance.

  const { username } = req.body;
  const password = req.password;
  const user = new User({ username, password });
  user.save((err, savedUser) => {
    if (err) {
      res.status(422);
      res.json({'user name and password is required': err.message})
    }
    res.json(savedUser);
  });
};

module.exports = {
  createUser
};

