export const state = () => ({
  collection: [],
  creating:false,
  streaming:false
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
  },
  setStream(state,payload){
    state.streaming=payload
  }
};

