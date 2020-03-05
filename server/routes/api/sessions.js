const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const middlewares = require('../../middlewares')



router.post('/', middlewares.getUserByName, async function (req, res) {
  //let json = req.body
  let user = res.user
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.json(user)
    } else {
      res.status(400).json({ message: "Wrong name or password" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }

})



// Middleware



module.exports = router