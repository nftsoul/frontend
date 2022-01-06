export const state = () => ({
  detailDialog: false,
});

export const mutations = {
  setDetailDialog(state, payload) {
      state.detailDialog=payload
  },
};
