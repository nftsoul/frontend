import util from 'tweetnacl-util'
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
    const isPhantomInstalled =await window.solana && window.solana.isPhantom;
    if (isPhantomInstalled) {
      try {
        var res = await window.solana.connect();
        context.commit("setWalletAddress", res.publicKey.toString());
        context.dispatch("getProfile", res.publicKey.toString());
        // //signing hash
        // const message = `Let me sign in !!!`
        //     const encodedMessage = new TextEncoder().encode(message);
        //     const signedMessage = await window.solana.signMessage(
        //       encodedMessage,
        //       "utf8"
        //     );
        //     var enc=new TextEncoder("utf-8")
        //     let encMesaage=enc.encode(this.message)
        //     let encPublicKey=util.encodeBase64(signedMessage.publicKey.toBuffer())
        //     let encSignature=util.encodeBase64(signedMessage.signature)

        //     console.log('encoded signature:',signedMessage.signature)
        //     console.log('encoded message:',encMesaage)
        //     console.log('encoded public key:',encPublicKey)

        //     this.$axios.post('https://staging-api.nftsoul.io/auth/login',{
        //       message:encMesaage,
        //       signature:encSignature,
        //       publicKey:encPublicKey,
        //       wallet_address:signedMessage.publicKey.toString()
        //     }).then(res=>{
        //       console.log('token',res.data)
        //     }).catch(err=>console.log(err.response))


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
  getProfile(context, address) {
    // fetch profile if not available create new and then fetch
    this.$axios
      .get(process.env.API_URL + "/profile/" + address)
      .then((res) => {
        if (res.data.length == 0) {
          this.$axios
            .post(process.env.API_URL + "/profile?wallet_address=" + address)
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
