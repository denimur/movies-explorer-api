const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../utils/UnauthorizedError');
const { ERROR_MESSAGES } = require('../utils/constants');

const { wrongEmailFormat, wrongCredentials } = ERROR_MESSAGES;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => isEmail(value),
      message: wrongEmailFormat,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(wrongCredentials);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(wrongCredentials);
          }
          return user;
        });
    });
};

module.exports = model('user', userSchema);
