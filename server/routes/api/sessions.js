const express = require('express')
const router = express.Router()
const User = require('../../models/user')



router.post('/', getUserByName, async (req, res) => {
  let json = req.body
  if (json.password == 'pass') {
    res.json(res.user)
  }
  else {
    res.status(401).json({ message: "Unauthorized" })
  }

})



// Middleware

async function getUserByName(req, res, next) {
  let user
  try {
    user = await User.find({ name: req.body.name })
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.user = user
  next()
}


module.exports = router