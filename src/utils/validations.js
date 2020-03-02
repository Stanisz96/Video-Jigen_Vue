let addVideoRules = {
  title: [
    v => !!v || "Title is required",
    v => v.length <= 50 || "Title must be less than 50 characters"
  ],
  description: [
    v => v.length <= 400 || "Descripion must be less than 200 characters"
  ],
  url: [
    v => v.length <= 100 || "Title must be less than 50 characters",
    v => /.+v=.+/.test(v) || "Path to video is invalid"
  ]
}

let loginRules = {
  name: [
    v => !!v || "Name is required"
  ],
  password: [
    v => !!v || "Password is required",
    v => v.length >= 3 || "Password required min 3 characters",
  ]
}

module.exports = {
  addVideoRules,
  loginRules
}