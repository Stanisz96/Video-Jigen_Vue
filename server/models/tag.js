const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  videosId: {
    type: Array,
    required: true,
    default: []
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Tag', tagSchema)