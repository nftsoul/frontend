export const state = () => ({
  fullmode: false,
});

export const mutations = {
  setFullMode(state, payload) {
    state.fullmode = payload;
  },
};
