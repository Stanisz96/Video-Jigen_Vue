
const jwt = require('jsonwebtoken')


function checkAndSetToken(Token, Api, Cookies) {
  let resultName
  let verify = jwt.verify(Token.accessToken, process.env.VUE_APP_ACCESS_TOKEN_SECRET, async (err) => {
    if (err) {
      return err
    } else {
      return { name: "OK" }
    }
  }).then(async (result) => {
    resultName = result.name
    if (resultName == 'TokenExpiredError') {
      let tokenRes = await Api().post('/auth/token', { token: Token.refreshToken })
      resultName = tokenRes.statusText
      let accessToken = tokenRes.data.accessToken
      console.log("new UAT is set")
      Cookies.set('UAT', accessToken)
      result.name = tokenRes.statusText
      return result
    } else {
      return result
    }
  })
  return verify
}



module.exports = {
  checkAndSetToken
}