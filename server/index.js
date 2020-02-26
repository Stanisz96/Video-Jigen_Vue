const cors = require('cors')
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

// Middleware
app.use(express.json())
app.use(cors())

const videosRouter = require('./routes/api/videos')
const tagsRouter = require('./routes/api/tags')



app.use('/api/videos', videosRouter)
app.use('/api/tags', tagsRouter)

app.listen(3000, () => console.log('Server Started'))

