export const state = () => ({
  walletAddress:null,
  provider:null
})

export const mutations = {
   setWalletAddress(state,payload){
       state.walletAddress=payload
   },
    getProvider(state) {
      if ("solana" in window) {
          const prov = window.solana;
          if (prov.isPhantom) {
              state.provider=prov
          }
      }

  }
}