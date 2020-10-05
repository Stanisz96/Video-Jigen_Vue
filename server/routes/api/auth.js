const router = require('express').Router()
const middle = require('../../middlewares')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Token = require('../../models/token')
const User = require('../../models/user')


// refresh acces token
router.post('/token', getRefreshTokens, (req, res) => {
  const refreshToken = req.body.token
  let Tokens = res.Tokens

  if (refreshToken == null) return res.sendStatus(401)
  if (!Tokens.refreshToken.includes(refreshToken)) return res.sendStatus(403)

  jwt.verify(refreshToken, process.env.VUE_APP_REFRESH_TOKEN_SECRET, async (err, data) => {
    if (err) return res.sendStatus(403)
    delete data.iat

    const accessToken = generateAccessToken(data)
    let updateData = await User.findById(data._id)
    updateData.token.accessToken = accessToken
    await updateData.save()

    res.json({ accessToken: accessToken })
  })
})

// remove refresh token from database when logout
router.post('/logout', getRefreshTokens, async (req, res) => {
  let Tokens = res.Tokens
  Tokens.refreshToken = Tokens.refreshToken.filter(token => token != req.body.token)
  await Tokens.save()
  res.sendStatus(204)
})


router.post('/login_user', middle.getUserByName, async function (req, res) {
  let user = res.user

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = generateAccessToken(res.userJson)
      const refreshToken = jwt.sign(res.userJson, process.env.VUE_APP_REFRESH_TOKEN_SECRET)
      addRefreshToken(refreshToken)

      user.token = { accessToken: accessToken, refreshToken: refreshToken }
      await user.save()
      res.json(user.token)
    } else {
      res.status(400).json({ message: "Wrong name or password" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/admin', middle.authenticateToken, async function (req, res) {
  let user = res.user
  res.json(user.admin)
})

/////////////////////////////////////////////////////////////////////////////////////////

function generateAccessToken(userJson) {
  return jwt.sign(userJson, process.env.VUE_APP_ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}

async function addRefreshToken(refreshToken) {
  let Tokens = await Token.findOne()
  Tokens.refreshToken.push(refreshToken)
  await Tokens.save()
}

async function getRefreshTokens(req, res, next) {
  let Tokens = await Token.findOne()
  res.Tokens = Tokens
  next()
}



module.exports = router