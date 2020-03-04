const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const User = require('../../models/user')

// Get users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })

  }
})
// Get one user
router.get('/:id', middlewares.getUser, (req, res) => {
  res.json(res.user)
})
// Create user
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    admin: req.body.admin
  })
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
// Update user
router.patch('/:id', middlewares.getUser, async (req, res) => {
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
router.delete('/:id', middlewares.getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: `Deleted user: ${res.user.name}` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router