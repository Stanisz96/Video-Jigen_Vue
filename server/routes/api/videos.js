const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Get videos data
router.get('/', async (req, res) => {
  const videos = await loadMonadsCollection()
  res.send(await videos.find({}).toArray());
})

// Get one video data
router.get('/:id', async (req, res) => {
  const videos = await loadMonadsCollection();
  res.send(await videos.find({ _id: req.params.id }).toArray());
})

async function loadMonadsCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://user1:pass1@examplecluster-fvqzu.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true })

  return client.db('monada_jigen').collection('videos');
}





module.exports = router