var nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");
// nacl.util = require('tweetnacl-util');
export const state = () => ({
  walletAddress: null,
  provider: null,
  accountBalance: "",
  accountDetail: "",
  profile: null,
  notificationCount: 0,
  snackbar: false,
  signature: "",
  token: null,
});

export const mutations = {
  setSnackbar(state, payload) {
    state.snackbar = true;
    state.signature = payload;
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
  setToken(state, payload) {
    state.token = payload;
  },
};

export const actions = {
  async connectWallet(context) {
    const isPhantomInstalled = (await window.solana) && window.solana.isPhantom;
    if (isPhantomInstalled) {
      try {
        var res = await window.solana.connect();
        context.commit("setWalletAddress", res.publicKey.toString());
        //signing hash
        if (this.$auth.loggedIn == false) {
          const message = `NFTsoul Authorization`;
          const encodedMessage = new TextEncoder().encode(message);
          const signedMessage = await window.solana.signMessage(
            encodedMessage,
            "utf8"
          );
          const messageBytes = new TextEncoder().encode(message);

          const publicKeyBytes = signedMessage.publicKey.toBuffer();

          const signatureBytes = signedMessage.signature;

          var qs = require("qs");
          var data = qs.stringify({
            message: nacl.util.encodeBase64(messageBytes),
            wallet_address: res.publicKey.toString(),
            publicKey: nacl.util.encodeBase64(publicKeyBytes),
            signature: nacl.util.encodeBase64(signatureBytes),
          });

          try {
            let response = await this.$auth.loginWith("local", {
              data: data,
            });
            this.$auth.setUser(response.data.user);
            context.commit('setProfile', response.data.user)
            this.$axios.setToken(response.data.token, "X-XSRF-TOKEN");
            context.dispatch("getNotificationCount", response.data.user);
          } catch (e) {
            console.log(e);
          }
        }

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
            .post("/profile/create?wallet_address=" + address)
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
