
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://user1:pass1@jigencluster-qypzc.mongodb.net/test?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: 'video-jigen',

})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
app.use(express.json())

const videosRouter = require('./routes/api/videos')
app.use('/api/videos', videosRouter)

app.listen(3000, () => console.log('Server Started'))

