export default {
  state: {
    snackbars: []
  },
  mutations: {
    SET_SNACKBAR(state, snackbar) {
      state.snackbars = state.snackbars.concat(snackbar)
    },
  },
  actions: {
    setSnackbar({ commit }, snackbar) {
      commit('SET_SNACKBAR', snackbar)
    },
  }
}
