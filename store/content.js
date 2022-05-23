
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

export const actions={
  preview(context,payload){
    this.$router.push({
      name:'preview-id',
      params:{id:payload._id}
    })
  }
}
