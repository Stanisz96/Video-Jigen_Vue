const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  tagIds: {
    type: Array,
    required: true,
    default: []
  },
  like: {
    type: Boolean,
    require: true,
    default: false
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Video', videoSchema)