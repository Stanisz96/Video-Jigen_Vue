import Vue from 'vue';
import Vuetify from 'vuetify/lib';
//import colors from 'vuetify/lib/util/colors'


Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#7dbd81',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        button: "#a1e3a6",
      },
      dark: {
        primary: '#2196F3',
        secondary: '#424242',
        accent: '#FF4081',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
    },
  },

});







        //       d: "#5eb56f",
  //       md: "#a1e3a6",
  //       ml: "#e1fae3",
  //       l: "#e1fae6",