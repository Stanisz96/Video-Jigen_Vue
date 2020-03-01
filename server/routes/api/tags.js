const express = require('express')
const router = express.Router()
const Tag = require('../../models/tag')

// Get tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find()
    res.json(tags)
  } catch (error) {
    res.status(500).json({ message: error.message })

  }
})
// Get one tag
router.get('/:id', getTag, (req, res) => {
  res.json(res.tag)
})
// Create tag
router.post('/', async (req, res) => {
  const tag = new Tag({
    name: req.body.name,
    videosId: req.body.videosId,
  })
  try {
    const newTag = await tag.save()
    res.status(201).json(newTag)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
// Update tag
router.patch('/:id', getTag, async (req, res) => {
  if (req.body.name != null) res.tag.name = req.body.name
  if (req.body.videosId != null) res.tag.videosId = req.body.videosId

  try {
    const updatedTag = await res.tag.save()
    res.json(updatedTag)
  } catch (error) {
    res.status(400).json({ message: error.message })

  }
})
// Delete tag
router.delete('/:id', getTag, async (req, res) => {
  try {
    await res.tag.remove()
    res.json({ message: `Deleted tag: ${res.tag.name}` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


// Middleware

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




module.exports = router