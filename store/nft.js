export const state = () => ({
  collection: [],
  creating:false,
  streaming:false,
  currentRoute:'',
  collectionIds:[]
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
  },
  selectNft(state,payload){
    state.collection.push(payload)
    state.collectionIds.push(payload.id)
  },
  deselectNft(state,payload){
    state.collection.splice(state.collection.indexOf(payload),1)
    state.collectionIds.splice(state.collectionIds.indexOf(payload.id),1)
  },
  setCollectionIds(state,payload){
    state.collectionIds=payload
  }
};

