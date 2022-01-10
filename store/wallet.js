export const state = () => ({
  walletAddress: null,
  provider: null,
  accountBalance: "",
  accountDetail: "",
});

export const mutations = {
  setWalletAddress(state, payload) {
    state.walletAddress = payload;
  },
  setAccountInfo(state,payload){
      state.accountBalance=payload.balance
      state.accountDetail=payload.detail
  }
};
