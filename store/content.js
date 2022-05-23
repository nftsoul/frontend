
export const state = () => ({
  detailDialog: false,
  freshNft: "",
  selected:''
});

export const mutations = {
  setDetailDialog(state, payload) {
    state.detailDialog = payload;
  },
  setFreshNft(state, payload) {
    state.freshNft = payload;
  },
  setSelected(state,payload){
    state.selected=payload
  }
};

