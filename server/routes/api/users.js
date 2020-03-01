const express = require('express')
const router = express.Router()
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
router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})
// Create user
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  })
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
// Update user
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.name != null) res.user.name = req.body.name
  if (req.body.email != null) res.user.email = req.body.email

  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({ message: error.message })

  }
})
// Delete user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: `Deleted user: ${res.user.name}` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


// Middleware

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




module.exports = router