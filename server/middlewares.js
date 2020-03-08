const Cookies = require('js-cookie')
const Video = require('./models/video')
const User = require('./models/user')
const Tag = require('./models/tag')
const jwt = require('jsonwebtoken')



// Find user by token
async function checkUserAuth(req, res, next) {
  try {
    let token = req.headers.authorization
    let user = await User.findOne({ token: token })
    let is_admin = user.admin
    if (is_admin) {
      next()
    } else {
      return res.status(401).json({ message: `User ${user.name} do not have permission` })
    }
  } catch (error) {
    next(error)
  }
}

const notFound = (req, res, next) => {
  const error = new Error(`Not found: ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? ':)' : error.stack,
  })
}

async function getVideo(req, res, next) {
  let video
  try {
    video = await Video.findById(req.params.id)
    if (video == null) {
      return res.status(404).json({ message: 'Cannot find video' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.video = video
  next()
}

async function getUser(req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.user = user
  next()
}

async function getUserByName(req, res, next) {
  let user
  try {
    user = await User.findOne({ name: req.body.name })
    userJson = await User.findOne({ name: req.body.name }).lean()
    delete userJson.token
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.user = user
  res.userJson = userJson
  next()
}

async function getTag(req, res, next) {
  let tag
  try {
    tag = await Tag.findById(req.params.id)
    if (tag == null) {
      return res.status(404).json({ message: 'Cannot find tag' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.tag = tag
  next()
}

function authenticateToken(req, res, next) {
  let authHeader = req.headers.authorization
  const authToken = authHeader.split(' ')[1]
  //console.log(authToken)
  if (authToken == null) return res.sendStatus(401)
  jwt.verify(authToken, process.env.VUE_APP_ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    res.user = user
    next()
  })

}

module.exports = {
  notFound,
  errorHandler,
  getVideo,
  getUser,
  getTag,
  checkUserAuth,
  getUserByName,
  authenticateToken
}