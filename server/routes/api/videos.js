const express = require('express')
const router = express.Router()
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
router.get('/:id', getVideo, (req, res) => {
  res.json(res.video)
})
// Create video
router.post('/', async (req, res) => {
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
router.patch('/:d', getVideo, async (req, res) => {
  if (req.body.name != null) {
    res.video.name = req.body.name
  }
  // ....
  try {
    const updatedVideo = await res.video.save()
    res.json(updatedVideo)
  } catch (error) {
    res.status(400).json({ message: error.message })

  }
})
// Delete video
router.delete('/:id', getVideo, async (req, res) => {
  try {
    await res.video.remove()
    res.json({ message: `Deleted video: ${res.video.name}` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


// Middleware

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




module.exports = router