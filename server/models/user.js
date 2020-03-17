const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    }
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

userSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})


module.exports = mongoose.model('User', userSchema)