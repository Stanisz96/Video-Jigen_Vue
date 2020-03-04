const uuid = require('uuid')
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
  token: {
    type: String,
    required: true,
    default: uuid.v4()
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)