<template>
  <div>
    <v-app-bar
      color="transparent"
      style="position: absolute; top: 0"
      app
      flat
      class="px-md-5"
      extended
    >
        <v-img
          :src="require('~/assets/images/NFTsoul-horizontal.png')"
          max-width="250"
          @click="$router.push({ path: '/' })"
          class="mt-3 link"
        ></v-img>
        <div class="outer-btn px-2 mt-3 ml-n4">
            <p class="mb-0">Nftsoul Beta</p>        
        </div>
      <v-spacer></v-spacer>
      <div class="hidden-md-and-down mt-5">
        <v-btn
          v-if="walletAddress == null"
          class="connect-wallet"
          @click="$store.dispatch('wallet/connectWallet')"
        >
          Connect Wallet
        </v-btn>

        <div v-else>
          <v-menu transition="slide-y-transition" bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-icon large dark v-bind="attrs" v-on="on" class="mx-2"
                >mdi-account</v-icon
              >
            </template>
            <v-card width="200" color="#636262">
              <v-list style="background-color: #636262" dense>
                <v-list-item
                  @click="
                    $router.push({
                      name: 'profile-address-index-nfts',
                      params: { address: walletAddress },
                    })
                  "
                >
                  <v-list-item-title>My Items</v-list-item-title><br /><br />
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item
                  @click="
                    $router.push({
                      name: 'profile-address-index-gallery',
                      params: { address: walletAddress },
                    })
                  "
                >
                  <v-list-item-title>Listed Items</v-list-item-title
                  ><br /><br />
                </v-list-item>
                <v-list-item
                  @click="
                    $router.push({
                      name: 'profile-address-index-exhibit',
                      params: { address: walletAddress },
                    })
                  "
                >
                  <v-list-item-title>Create Gallery</v-list-item-title
                  ><br /><br />
                </v-list-item>
                <v-list-item
                  @click="
                    $router.push({
                      name: 'profile-address-index-earning-logs',
                      params: { address: walletAddress },
                    })
                  "
                >
                  <v-list-item-title>Earning Logs</v-list-item-title
                  ><br /><br />
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
          <div class="auth-box mt-n2">
            <div class="auth-inside">
              <div
                class="auth-inside-1"
                @click="
                  $router.push({
                    name: 'profile-address-index-nfts',
                    params: { address: walletAddress },
                  })
                "
              >
                <v-avatar size="20" class="mx-2 mt-3">
                  <v-img :src="require('~/assets/images/phantom.png')"></v-img>
                </v-avatar>
              </div>
              <div class="auth-inside-2">
                <v-menu transition="slide-y-transition" bottom offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <p class="wallet-text mt-3" v-bind="attrs" v-on="on">
                      {{ walletAddress.slice(0, 8) + "..." }}
                    </p>
                  </template>
                  <v-card width="200" color="#636262" class="mt-3">
                    <v-list style="background-color: #636262" dense>
                      <v-list-item @click="disconnect">
                        <v-list-item-title>Disconnect</v-list-item-title
                        ><br /><br />
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-menu>
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-lg-and-up"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      absolute
      temporary
      right
      dark
      color="primary"
    >
      <v-btn
        v-if="walletAddress == null"
        class="connect-wallet"
        @click="$store.dispatch('wallet/connectWallet')"
      >
        Connect Wallet
      </v-btn>
      <v-list v-else nav dense>
        <v-list-item>
          <div class="auth-box mt-5 mx-auto">
            <div class="auth-inside">
              <div
                class="auth-inside-1"
                @click="
                  $router.push({
                    name: 'profile-address',
                    params: { address: walletAddress },
                  })
                "
              >
                <v-avatar size="20" class="mx-2 mt-3">
                  <v-img :src="require('~/assets/images/phantom.png')"></v-img>
                </v-avatar>
              </div>
              <div class="auth-inside-2">
                <p class="wallet-text mt-3">
                  {{ walletAddress.slice(0, 8) + "..." }}
                </p>
              </div>
            </div>
          </div>
        </v-list-item>

        <v-list-item
          @click="
            $router.push({
              name: 'profile-address-index-nfts',
              params: { address: walletAddress },
            })
          "
        >
          <v-list-item-title>My Items</v-list-item-title><br /><br />
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          @click="
            $router.push({
              name: 'profile-address-index-gallery',
              params: { address: walletAddress },
            })
          "
        >
          <v-list-item-title>Listed Items</v-list-item-title><br /><br />
        </v-list-item>
        <v-list-item
          @click="
            $router.push({
              name: 'profile-address-index-exhibit',
              params: { address: walletAddress },
            })
          "
        >
          <v-list-item-title>Create Gallery</v-list-item-title><br /><br />
        </v-list-item>
        <v-list-item
          @click="
            $router.push({
              name: 'profile-address-index-earning-logs',
              params: { address: walletAddress },
            })
          "
        >
          <v-list-item-title>Earning Logs</v-list-item-title><br /><br />
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="disconnect">
          <v-list-item-title>Disconnect</v-list-item-title><br /><br />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
const web3 = require("@solana/web3.js");

export default {
  data() {
    return {
      resp: "",
      drawer: false,
      authBtn: null,
      loaded:false
    };
  },
  computed: {
    walletAddress() {
      return this.$store.state.wallet.walletAddress;
    },
  },
  created(){
        this.$store.dispatch('wallet/connectWallet')
  },
 
  methods: {
    disconnect() {
      window.solana.request({
        method: "disconnect",
      });
      this.$store.commit("wallet/setWalletAddress", null);
      this.$router.push('/')
    },
  },
};
</script>

<style lang="css">
@import "~/assets/styles/appbar.css";

.v-btn span {
  font-size: 14px;
}

.connect-wallet {
  background: linear-gradient(
    265.07deg,
    #4a04d8 3.26%,
    #5e0fff 31.76%,
    #fd2bff 70.6%,
    #c202d3 97.81%
  );
}

.auth-box {
  float: right;
  background: linear-gradient(
    265.07deg,
    #4a04d8 3.26%,
    #5e0fff 31.76%,
    #fd2bff 70.6%,
    #c202d3 97.81%
  );
  width: 145px;
  height: 45px;
  border-radius: 7px;
  padding: 1px;
}

.auth-inside {
  background: linear-gradient(
    264.44deg,
    #fe87ff 2.87%,
    #c202d3 34.05%,
    #5e0fff 67.82%,
    #1905da 99.15%
  );
  border-radius: 7px;
}

.auth-inside-1 {
  float: left;
  width: 30%;
  height: 43px;
  background-color: #030537;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  cursor: pointer;
}

.auth-inside-2 {
  cursor: pointer;
  width: 69%;
  height: 43px;
  margin-left: 1px;
  padding: 0 5px;
  float: left;
  background-color: #030537;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
}

.wallet-text {
  color: #f5f7f8;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1px;
}
</style>
