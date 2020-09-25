require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const middle = require('./middlewares')

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: 'video-jigen',

})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

// Middleware
app.use(helmet())
app.use(morgan('common'))
app.use(express.json())
app.use(cors())

const videosRouter = require('./routes/api/videos')
const tagsRouter = require('./routes/api/tags')
const userRouter = require('./routes/api/users')
const authRouter = require('./routes/api/auth')


app.use('/api/videos', videosRouter)
app.use('/api/tags', tagsRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)


app.use(middle.notFound)
app.use(middle.errorHandler)

app.listen(3000, () => console.log('Server Started'))

