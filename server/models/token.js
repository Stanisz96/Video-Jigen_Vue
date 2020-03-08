const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
  refreshToken: {
    type: Array,
    required: true,
    default: []
  }
})

module.exports = mongoose.model('Token', tokenSchema)