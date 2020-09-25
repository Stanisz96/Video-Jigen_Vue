const router = require('express').Router()
const middle = require('../../middlewares')
const User = require('../../models/user')


// Get users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '_id name').exec()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Login user
router.get('/login', middle.authenticateToken, (req, res) => {
  res.json(res.data)
})

// Create user
router.post('/', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    await user.save(function (err) {
      if (err) throw err;
    })
    res.sendStatus(201)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update user
router.patch('/:id', middle.getUser, async (req, res) => {
  if (req.body.name != null) res.user.name = req.body.name
  if (req.body.email != null) res.user.email = req.body.email
  if (req.body.admin != null) res.user.admin = req.body.admin
  if (req.body.token != null) res.user.token = req.body.token

  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete user
router.delete('/:id', middle.getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: `Deleted user: ${res.user.name}` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


module.exports = router