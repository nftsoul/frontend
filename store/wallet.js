import nacl from "tweetnacl";
// nacl.util = require('tweetnacl-util');
export const state = () => ({
  walletAddress: null,
  provider: null,
  accountBalance: "",
  accountDetail: "",
  profile: null,
  notificationCount: 0,
  snackbar:false,
  signature:''
});

export const mutations = {
  setSnackbar(state,payload){
    state.snackbar=true
    state.signature=payload
  },
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
  setNoficationCount(state, payload) {
    state.notificationCount = payload;
  },
};

export const actions = {
  async connectWallet(context) {
    const isPhantomInstalled = (await window.solana) && window.solana.isPhantom;
    if (isPhantomInstalled) {
      try {
        var res = await window.solana.connect();
        context.commit("setWalletAddress", res.publicKey.toString());
        context.dispatch("getProfile", res.publicKey.toString());
        //signing hash
        // const message = `NFTsoul Authorization`;
        // const encodedMessage = new TextEncoder().encode(message);
        // const signedMessage = await window.solana.signMessage(
        //   encodedMessage,
        //   "utf8"
        // );
        // const messageBytes = new TextEncoder().encode(message);

        // const publicKeyBytes = signedMessage.publicKey.toBuffer();

        // const signatureBytes = signedMessage.signature;

        // console.log("encoded signature:", signatureBytes);
        // console.log("encoded message:", messageBytes);
        // console.log("encoded public key:", publicKeyBytes);

        // const result =  nacl.sign.detached.verify(
        //   messageBytes,
        //   signatureBytes,
        //   publicKeyBytes
        // );

        // if (!result) {
        //   console.log(`authentication failed`);
        //   throw new Error("user can not be authenticated");
        // }
        // else{
        //    console.log('result:',result)
        // }
        // let data=[messageBytes,signatureBytes,publicKeyBytes]
        // let json=JSON.stringify(data)
        // let post_data={json_data:json}
        // console.log('r:',post_data)

        // this.$axios.post('/auth/login',post_data).then(res=>{
        //   console.log('token',res.data)
        // }).catch(err=>console.log(err.response))

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
      .get("/profile/" + address)
      .then((res) => {
        if (res.data.length == 0) {
          this.$axios
            .post(process.env.API_URL + "/profile?wallet_address=" + address)
            .then((res) => {
              context.commit("setProfile", res.data.data);
              context.dispatch("getNotificationCount", res.data.data);
            })
            .catch((err) => {
              console.log(err.response);
            });
        } else {
          context.commit("setProfile", res.data[0]);
          context.dispatch("getNotificationCount", res.data[0]);
        }
      })
      .catch((err) => console.log(err.response));
  },
  getNotificationCount(context, payload) {
    this.$axios.get("/notification/new/" + payload._id).then((res) => {
      context.commit("setNoficationCount", res.data.newNotifications);
    });
  },
};
