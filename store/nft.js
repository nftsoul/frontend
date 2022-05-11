export const state = () => ({
  collection: [],
  creating:false
  // profile:null
});

export const mutations = {
  // setProfile(state,payload){
  //   state.profile=payload
  // },
  setCollection(state, payload) {
    state.collection = payload
  },
  setCreating(state,payload){
    state.creating=payload
  }
};

