export const state = () => ({
  walletAddress: null,
  provider: null,
  accountBalance: "",
  accountDetail: "",
});

export const mutations = {

  setWalletAddress(state, payload) {
    state.walletAddress = payload
  },
  setAccountInfo(state, payload) {
    state.accountBalance = payload.balance
    state.accountDetail = payload.detail
  },
  
};


export const actions = {
  async connectWallet(context) {
    const isPhantomInstalled = window.solana && window.solana.isPhantom
    if (isPhantomInstalled) {
      try {
        var res = await window.solana.connect();
        context.commit('setWalletAddress',res.publicKey.toString())
        this.$toast
          .success('Phantom wallet successfully connected.', {
            iconPack: "mdi",
            icon: "mdi-wallet",
            theme: "outline",
          })
          .goAway(3000);
      } catch (err) {
        if ((err.code = 4001)) {
          this.$toast
            .error(err.message, {
              iconPack: "mdi",
              icon: "mdi-cancel",
              theme: "outline",
            })
            .goAway(3000);
        }
      }
    }
    else {
      this.$toast
        .error("Please install phantom wallet", {
          iconPack: "mdi",
          icon: "mdi-wallet",
          theme: "outline"
        })
        .goAway(3000);
    }
  },
}
