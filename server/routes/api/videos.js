const express = require('express')
const router = express.Router()
const middle = require('../../middlewares')
const Video = require('../../models/video')

// Get videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find()
    res.json(videos)

  } catch (error) {
    res.status(500).json({ message: error.message })

  }
})
// Get one video
router.get('/:id', middle.getVideo, (req, res) => {
  res.json(res.video)
})
// Create video
router.post('/', middle.checkUserAuth, async (req, res) => {
  const video = new Video({
    name: req.body.name,
    description: req.body.description,
    thumbnail: req.body.thumbnail,
    videoUrl: req.body.videoUrl,
    tagIds: req.body.tagIds
  })
  try {
    const newVideo = await video.save()
    res.status(201).json(newVideo)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
// Update video
router.patch('/:id', middle.checkUserAuth, middle.getVideo, async (req, res) => {
  if (req.body.name != null) res.video.name = req.body.name
  if (req.body.description != null) res.video.description = req.body.description
  if (req.body.thumbnail != null) res.video.thumbnail = req.body.thumbnail
  if (req.body.videoUrl != null) res.video.videoUrl = req.body.videoUrl
  if (req.body.tagIds != null) res.video.tagIds = req.body.tagIds
  if (req.body.like != null) res.video.like = req.body.like

  try {
    const updatedVideo = await res.video.save()
    res.json(updatedVideo)
  } catch (error) {
    res.status(400).json({ message: error.message })

  }
})
// Delete video
router.delete('/:id', middle.checkUserAuth, middle.getVideo, async (req, res) => {
  try {
    await res.video.remove()
    res.json({ message: `Deleted video: ${res.video.name}` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router