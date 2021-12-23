export const state = () => ({
  walletAddress:null
})

export const mutations = {
   setWalletAddress(state,payload){
       state.walletAddress=payload
   }
}