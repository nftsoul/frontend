export const state = () => ({
  collection: [],
});

export const mutations = {
  setCollection(state, payload) {
    state.collection = payload
  },
};
