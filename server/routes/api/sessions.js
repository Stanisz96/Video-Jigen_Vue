const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const middlewares = require('../../middlewares')


router.post('/', middlewares.authenticateToken, async function (req, res) {
  //let json = req.body
  let user = req.user
  //console.log(user)
  try {
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }

})


module.exports = router