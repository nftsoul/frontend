// import NFTs from "@primenums/solana-nft-tools";
// const web3 = require("@solana/web3.js");

// let solrayz = null;
// if (process.client) {
//     solrayz = require("@nfteyez/sol-rayz");
// }
// import axios from "axios";
// var cluster=process.env.CLUSTER
// async function fetchSolanaNft(wallet_address){
//     if (this.cluster == "devnet") {
//         const conn = new web3.Connection(
//             web3.clusterApiUrl("devnet"),
//             "confirmed"
//         );
//         this.nfts = [];
//         // Get all mint tokens (NFTs) from your wallet
//         const walletAddr = this.walletAddress;
//         let mints = await NFTs.getMintTokensByOwner(conn, walletAddr);

//         let promises = [];
//         for (var x = 0; x < mints.length; x++) {
//             let myNFT = await NFTs.getNFTByMintAddress(conn, mints[x]);
//             if (myNFT.owner == this.walletAddress) {
//                 this.nfts.push(myNFT);
//             }
//         }
//         console.log('list:', this.nfts)
//     } else {
//         const publicAddress = await solrayz.resolveToWalletAddress({
//             text: this.walletAddress,
//         });
//         this.meta = await solrayz.getParsedNftAccountsByOwner({
//             publicAddress,
//         });
//         let promises = [];
//         for (var x = 0; x < this.meta.length; x++) {
//             try {
//                 promises.push(
//                     await axios.get(this.meta[x].data.uri).then((response) => {
//                         if (response.data) {
//                             this.nfts.push(response.data);
//                         }
//                     })
//                 );
//             } catch (e) {
//                 console.log(e);
//             }
//             Promise.all(promises);
//         }
//     }
// }
// function fetchMetamaskNft(wallet_address){
    
// }
// module.exports={
//     fetchSolanaNft:fetchSolanaNft,
//     fetchMetamaskNft:fetchMetamaskNft
// }