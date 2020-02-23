import { Server, JSONAPISerializer, Model, hasMany } from 'miragejs'
import vJSON from './videos.json'
import tagsJSON from './tags.json'
import usersJSON from './users.json'

var videosJSON
if (window.localStorage.getItem("addedVideos") === null) {

  videosJSON = vJSON
  window.localStorage.setItem('addedVideos', JSON.stringify(vJSON))
  console.log("mirage czyta z pliku")
} else {
  videosJSON = JSON.parse(window.localStorage.addedVideos)
  console.log("mirage czyta z localstorage")
}

export function makeServer({ environment = "development" } = {}) {

  let server = new Server({
    environment,
    serializers: {
      application: JSONAPISerializer,
      video: JSONAPISerializer.extend({
        include: ['tags'],
        normalize(json) {
          return {
            data: {
              type: 'videos',
              attributes: json
            }
          }
        }
      }),
      tag: JSONAPISerializer.extend({
        include: ['videos']
      })
    },
    fixtures: {
      videos: videosJSON,
      tags: tagsJSON,
      users: usersJSON
    },
    models: {
      user: Model,
      video: Model.extend({
        tags: hasMany()
      }),
      tag: Model.extend({
        videos: hasMany()
      })
    },
    routes() {
      this.namespace = "api"
      this.get("/videos", schema => {
        return schema.videos.all()
      })
      this.post("/videos", (schema, req) => {
        let data = JSON.parse(req.requestBody)
        return schema.videos.create(data)
      })
      this.put("/videos/:id")
      this.delete("/videos/:id")
      this.get('/users')
      this.post("/sessions", function (schema, req) {
        let json = JSON.parse(req.requestBody);
        let res = schema.users.findBy({ email: json.email })
        if (json.password == "aaa") {
          return this.serialize(res)
        } else {
          return new Response(401)
        }
      })
      this.post('/users', function (schema, req) {
        let json = JSON.parse(req.requestBody)
        let res = schema.users.create(json)
        return this.serialize(res)

      })
      this.get('/users/:id')
    }

  })
  return server

}
