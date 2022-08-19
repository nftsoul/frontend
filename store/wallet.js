var nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");
import detectEthereumProvider from "@metamask/detect-provider";

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
  walletDialog: false,
  wallet: null,
});

export const mutations = {
  setWalletDialog(state, payload) {
    state.walletDialog = payload;
  },
  setSnackbar(state, payload) {
    state.snackbar = true;
    state.signature = payload;
  },
  setWalletAddress(state, payload) {
    state.walletAddress = payload;
  },
  setWallet(state, payload) {
    state.wallet = payload;
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
  async checkLogin(context) {
    if (this.$auth.strategy.token.get()) {
      let profile = this.$auth.$storage.getUniversal("uni-nftsoul-user");
      context.commit(
        "setWallet",
        this.$auth.$storage.getUniversal("uni-nftsoul-wallet")
      );
      this.$auth.setUser(profile.user)
      context.commit("setWalletAddress", profile.user.wallet_address);
      context.commit("setProfile", profile.user);
      context.dispatch("getNotificationCount", profile.user);
    } else {
      context.commit("setWalletDialog", true);
      context.commit("setWalletAddress", null);
    }
  },

  detectPhantom() {
    const isPhantomInstalled = window.solana && window.solana.isPhantom;
    return isPhantomInstalled;
  },
  async connectPhantom(context) {
    try {
      context.commit("setWalletDialog", false);
      const resp = await window.solana.connect();
      var walletAddress = resp.publicKey.toString();
      context.commit("setWallet", "Phantom");
      context.dispatch("signatureRequest", walletAddress);
    } catch (err) {
      this.$toast
        .error(err.message, {
          iconPack: "mdi",
          icon: "mdi-wallet",
          theme: "outline",
        })
        .goAway(3000);
    }
  },
  async detectMetamask() {
    const provider = await detectEthereumProvider();

    if (provider) {
      return provider === window.ethereum;
    }
  },
  async connectMetamask(context) {
    try {
      context.commit("setWalletDialog", false);

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      context.commit("setWallet", "Metamask");
      context.dispatch("signatureRequest", account);
    } catch (err) {
      this.$toast
        .error(err.message, {
          iconPack: "mdi",
          icon: "mdi-wallet",
          theme: "outline",
        })
        .goAway(3000);
    }
  },
  async signatureRequest(context, walletAddress) {
    let nonce = await context.dispatch("createNonce");
    const message = `NFTsoul Authorization Sign In Request   Nonce:` + nonce;
    let data = null;

    if (context.state.wallet == "Phantom") {
      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await window.solana.signMessage(
        encodedMessage,
        "utf8"
      );
      const messageBytes = new TextEncoder().encode(message);

      const publicKeyBytes = signedMessage.publicKey.toBuffer();

      const signatureBytes = signedMessage.signature;

      var qs = require("qs");
      data = qs.stringify({
        wallet: context.state.wallet,
        message: nacl.util.encodeBase64(messageBytes),
        wallet_address: walletAddress,
        publicKey: nacl.util.encodeBase64(publicKeyBytes),
        signature: nacl.util.encodeBase64(signatureBytes),
      });
    } else if (context.state.wallet == "Metamask") {
      data = {
        wallet: context.state.wallet,
        wallet_address: walletAddress,
      };
      // console.log(window.ethereum.si)
      // window.ethereum.personal.sign(
      //   window.ethereum.fromUtf8(message),
      //   walletAddress,
      //   (err, signature) => {
      //     console.log('err:',err,'signature:',signature)
      //   }
      // );
    } else {
      this.$toast
        .error("Login failed", {
          iconPack: "mdi",
          icon: "mdi-wallet",
          theme: "outline",
        })
        .goAway(3000);
    }

    try {
      let response = await this.$auth.loginWith("local", {
        data: data,
      });

      context.commit("setWalletAddress", walletAddress);
      this.$auth.setUser(response.data.user);
      this.$auth.$storage.setUniversal("uni-nftsoul-user", response.data);
      this.$auth.$storage.setUniversal(
        "uni-nftsoul-wallet",
        context.state.wallet
      );

      context.commit("setProfile", response.data.user);
      this.$axios.setToken(response.data.token, "X-XSRF-TOKEN");
      context.dispatch("getNotificationCount", response.data.user);

    } catch (e) {
      this.$toast
        .error("Login Failed", {
          iconPack: "mdi",
          icon: "mdi-wallet",
          theme: "outline",
        })
        .goAway(3000);
    }
  },
  disconnect(context) {
    if (context.state.wallet == "Phantom") {
      window.solana.request({
        method: "disconnect",
      });
    } else if (context.state.wallet == "Metamask") {
      // ethereum.on("disconnect");
    }
    context.commit("setWalletAddress", null);
    this.$auth.logout();
    this.$auth.$storage.removeUniversal("uni-nftsoul-user");
    this.$auth.$storage.removeUniversal("uni-nftsoul-wallet");

    this.$router.push("/");
  },

  getNotificationCount(context, payload) {
    this.$axios.get("/notification/new/" + payload._id).then((res) => {
      context.commit("setNoficationCount", res.data.newNotifications);
    });
  },
  createNonce() {
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let nonce = "";
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        nonce += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      if (i < 3) {
        nonce += "-";
      }
    }
    return nonce;
  },
};
