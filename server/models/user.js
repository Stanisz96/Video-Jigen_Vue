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
  // token: {
  //   type: String,
  //   required: true,
  //   default: uuid.v4()
  // },
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


// userSchema.methods.comparePassword = function (candidatePass, cb) {
//   bcrypt.compare(candidatePass, this.password, function (err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch)
//   })
// }


module.exports = mongoose.model('User', userSchema)