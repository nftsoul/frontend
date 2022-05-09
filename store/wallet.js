export const state = () => ({
  walletAddress: null,
  provider: null,
  accountBalance: "",
  accountDetail: "",
  profile: null,
});

export const mutations = {
  setWalletAddress(state, payload) {
    state.walletAddress = payload;
  },
  setAccountInfo(state, payload) {
    state.accountBalance = payload.balance;
    state.accountDetail = payload.detail;
  },
  setProfile(state, payload) {
    state.profile = payload;
  },
};

export const actions = {
  async connectWallet(context) {
    const isPhantomInstalled = window.solana && window.solana.isPhantom;
    if (isPhantomInstalled) {
      try {
        var res = await window.solana.connect();
        context.commit("setWalletAddress", res.publicKey.toString());
        context.dispatch('getProfile')
        this.$toast
          .success("Phantom wallet successfully connected.", {
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
    } else {
      this.$toast
        .error("Please install phantom wallet", {
          iconPack: "mdi",
          icon: "mdi-wallet",
          theme: "outline",
        })
        .goAway(3000);
    }
  },
  getProfile(context) {
    // fetch profile if not available create new and then fetch
    let wallet=context.state.walletAddress
    this.$axios
      .get(process.env.API_URL + "/profile/" + wallet)
      .then((res) => {
        if (res.data.length == 0) {
          this.$axios
            .post(
              process.env.API_URL +
                "/profile?wallet_address=" +
                wallet
            )
            .then((res) => {
              context.commit("setProfile", res.data.data);
            })
            .catch((err) => {
              console.log(err.response);
            });
        } else {
          context.commit("setProfile", res.data[0]);
        }
      })
      .catch((err) => console.log(err.response));
  },
};
