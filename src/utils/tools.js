function checkAndSetToken(jwt, UAT, URT, Api, Cookies) {
  let resultName
  let verify = jwt.verify(UAT, process.env.VUE_APP_ACCESS_TOKEN_SECRET, async (err) => {
    if (err) {
      return err
    } else {
      return { name: "OK" }
    }
  }).then(async (result) => {
    resultName = result.name
    if (resultName == 'TokenExpiredError') {
      let tokenRes = await Api().post('/auth/token', { token: URT })
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
  // let tokenRes = await Api().post('/auth/token', { token: URT })
  // let accessToken = tokenRes.data.accessToken
  // Cookies.set('UAT', accessToken)
  //return resultName


  // if (UAT == null || URT == null) return 'user not login'
  // if (jwt.verify(UAT, process.env.VUE_APP_ACCESS_TOKEN_SECRET)) {
  //   return 'user token is active'
  // } else {
  //   let tokenRes = await Api().post('/auth/token', { token: URT })
  //   let accessToken = tokenRes.data.accessToken
  //   Cookies.set('UAT', accessToken)
  //   return 'user token is refresh'
  // }



  // jwt.verify(UAT, process.env.VUE_APP_ACCESS_TOKEN_SECRET, async (err, user) => {
  //   if (err) {
  //   } else {
  //     return user
  //   }
  // })
  // let tokenRes = await Api().post('/auth/token', { token: URT })
  // let accessToken = tokenRes.data.accessToken
  // Cookies.set('UAT', accessToken)
}











module.exports = {
  checkAndSetToken
}