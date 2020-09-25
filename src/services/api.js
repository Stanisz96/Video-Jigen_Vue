import axios from 'axios'
import Cookies from 'js-cookie'

export default () => {
  let userToken = Cookies.get('UAT')

  return axios.create({
    baseURL: 'http://localhost:3000/api/',
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + userToken
    }
  })
}