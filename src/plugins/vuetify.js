import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        d: "#7dbd81",
        md: "#a1e3a6",
        ml: "#e1fae3",
        l: "#e1fae6",
      },
      dark: {
        d: colors.teal.darken4, // #E53935
        md: colors.green.darken2, // #FFCDD2
        ml: colors.green.lighten2, // #3F51B5
        l: colors.green.lighten5,
      }
    },
  },
});
