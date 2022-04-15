export const state = () => ({
  collection: [],
  profile:null
});

export const mutations = {
  setProfile(state,payload){
    state.profile=payload
  },
  setCollection(state, payload) {
    state.collection = payload
  },
};
