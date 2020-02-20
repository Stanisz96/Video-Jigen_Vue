import Vue from 'vue'
import Vuex from 'vuex'
import VueYoutube from "vue-youtube";
import Api from '@/services/api'
//import uuid from 'uuid'

Vue.use(Vuex)
Vue.use(VueYoutube)

export default new Vuex.Store({
  state: {
    monads_color: [
      // {
      //   id: 1,
      //   name: "Black (Time)",
      //   description:
      //     "By controlling frequency of black, the hero has the ability to manipulate time. Hero can slow down or accelerate yourself or given objects. This is one of the two most unique colors. Manipulate of color black is only possible when usere has gens which permits him/her uses colors blue, yellow, purple. But control of that colors are much harder and less powerful, than people with one or two colors",
      //   thumbnail:
      //     "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fall4desktop.com%2Fdata_images%2Foriginal%2F4241187-light.jpg&f=1&nofb=1",
      //   thumbnail_color: {
      //     filter: "grayscale(100%) invert(100%)",
      //   }
      // },
      // {
      //   id: 2,
      //   name: "White (Space)",
      //   description:
      //     "By controlling this color - which is one of the two most unique colors - you can manipulate space. This involves additional skills resulting from particle manipulation, density, gravity manipulation. The hero can use the colors red, green, blue, at the beginning they are all weakened by 50%, but choosing one of the colors and controlling it causes the weakening to decrease. It is not possible to develop 100% consecutive colors. The best effect that can be obtained is 75% of each color.",
      //   thumbnail:
      //     "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fall4desktop.com%2Fdata_images%2Foriginal%2F4241187-light.jpg&f=1&nofb=1",
      //   thumbnail_color: {
      //     filter: "grayscale(100%)"
      //   }
      // },
      // {
      //   id: 3,
      //   name: "Red (Heat)",
      //   description:
      //     "Maybe the ability to manipulate heat. And if it can't be clearly understood, then only fire remains. Human casting the spell with high heat has to perfectly manipulate his own temperature, becouse this spell can harm him too.",
      //   thumbnail:
      //     "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fall4desktop.com%2Fdata_images%2Foriginal%2F4241187-light.jpg&f=1&nofb=1",
      //   thumbnail_color: {
      //     filter: "hue-rotate(100deg)  sepia(10%) saturate(1.4)"
      //   }
      // },
      // {
      //   id: 4,
      //   name: "Orange (Mineral)",
      //   description:
      //     "First of all, basic minerals, rocks, sand, soil. Later more difficult to manipulate various other minerals, amethyst, gold, etc. The ability to transform minerals at an even greater level of difficulty.",
      //   thumbnail:
      //     "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fall4desktop.com%2Fdata_images%2Foriginal%2F4241187-light.jpg&f=1&nofb=1",
      //   thumbnail_color: {
      //     filter: "hue-rotate(140deg) sepia(60%) saturate(3)"
      //   }
      // },
      // {
      //   id: 5,
      //   name: "Yello (Electric charge)",
      //   description:
      //     "Controlling speed of electrons and creating electromagnetic field. Capability of changing electric power to mechanical power. Able to store electric charges.",
      //   thumbnail:
      //     "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fall4desktop.com%2Fdata_images%2Foriginal%2F4241187-light.jpg&f=1&nofb=1",
      //   thumbnail_color: {
      //     filter: "hue-rotate(150deg) sepia(100%) saturate(3)"
      //   }
      // },
      // {
      //   id: 6,
      //   name: "Green (Nature)",
      //   description:
      //     "This is hard to manipulate color. User can affect on every part of nature which isn't alive but can grow.",
      //   thumbnail:
      //     "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fall4desktop.com%2Fdata_images%2Foriginal%2F4241187-light.jpg&f=1&nofb=1",
      //   thumbnail_color: {
      //     filter: "hue-rotate(190deg)"
      //   }
      // },
      // {
      //   id: 7,
      //   name: "Cyan (Mind Control)",
      //   description:
      //     "User can affect on living things mind. Can change feelings, put thinks in their heads, communitate through mind and even create halucinations. Depend of how much is complicated brain it is harder to manipulate. Also will of person can decrease affect. User can also search informations in living things brain, but this is much harder.",
      //   thumbnail:
      //     "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fall4desktop.com%2Fdata_images%2Foriginal%2F4241187-light.jpg&f=1&nofb=1",
      //   thumbnail_color: {
      //     filter: "hue-rotate(-70deg)  sepia(10%) saturate(2) grayscale(30%)"
      //   }
      // },
      // {
      //   id: 8,
      //   name: "Blue (Water)",
      //   description:
      //     "User can manipulate water in every state, so can also control heat of water. I dont really know right now what I can tell more about this.",
      //   thumbnail:
      //     "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fall4desktop.com%2Fdata_images%2Foriginal%2F4241187-light.jpg&f=1&nofb=1",
      //   thumbnail_color: {
      //     filter: "hue-rotate(-50deg)  sepia(20%) saturate(2)"
      //   }
      // },
      // {
      //   id: 9,
      //   name: "Violet (Poisone)",
      //   description:
      //     "Ability to create, endure poisons. If user has talent - can also create not only some basic poisons which are in nature but also create complicated chemical compounds like psychedelics. So user can affect on somebody mind. Those are abilities for assasins.",
      //   thumbnail:
      //     "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fall4desktop.com%2Fdata_images%2Foriginal%2F4241187-light.jpg&f=1&nofb=1",
      //   thumbnail_color: {
      //     filter: "hue-rotate(35deg)"
      //   }
      // }
    ],
    videos: []
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos;
    },
    SET_MONADS(state, monads) {
      state.monads_color = monads;
    }
  },
  actions: {
    async loadVideos({ commit }) {
      let response = await Api().get("/videos");
      commit('SET_VIDEOS', response.data)
    },
    async loadMonads({ commit }) {
      let response = await Api().get("/monads");
      commit('SET_MONADS', response.data)
    }

  },
  modules: {}
})