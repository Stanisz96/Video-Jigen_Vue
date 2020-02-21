import { Server, JSONAPISerializer, Model, hasMany } from 'miragejs'
import videosJSON from './videos.json'
import mcolorsJSON from './monads_color.json'
import tagsJSON from './tags.json'

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
      mcolors: mcolorsJSON,
      tags: tagsJSON
    },
    models: {
      video: Model.extend({
        tags: hasMany()
      }),
      tag: Model.extend({
        videos: hasMany()
      }),
      mcolor: Model
    },
    routes() {
      this.namespace = "api"
      this.get("/videos", schema => {
        return schema.videos.all()
      })
      this.get("/monads", schema => {
        return schema.mcolors.all()
      })
      this.post("/videos")
      this.put("/videos/:id")
      this.delete("/videos/:id")
    }

  })

  // server.db.loadData({
  //   videos: videosJSON,
  //   monads_color: mcolorJSON
  // })

  return server

}
