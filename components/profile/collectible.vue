<template>
<div class="dark-bg">
    <v-card min-height="500" flat color="transparent">
        <v-container>
            <v-row justify="center">
                <v-col cols="8">
                    <v-row v-if="nfts.length==0" justify="center">
                        <v-col align="center">
                            <orbit-spinner class="ma-10" :animation-duration="1200" :size="55" color="#fff" />
                            <p>Loading your NFTs...</p>
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col cols="12" lg="4" md="6" v-for="(item,i) in nfts" :key="i" align="center">
                            <v-card max-width="300" class="art-card" height="390" @click="$store.commit('content/setDetailDialog',true)">
                                <v-img :src="item.img" :lazy-src="item.img" width="270" height="240">
                                    <template v-slot:placeholder>
                                        <v-row class="fill-height ma-0" align="center" justify="center">
                                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                        </v-row>
                                    </template>
                                </v-img>
                                <v-card-text class="ml-n2 white--text text-left">{{item.title}}</v-card-text>
                                <p class="mx-2 mt-n2 desc-text text-left">
                                    {{item.content}}
                                </p>
                                <v-card-actions class="mt-n10">
                                    <v-spacer></v-spacer>
                                    <v-chip class="ma-2 mt-5" color="#030537">
                                        125
                                        <v-icon class="ml-3">mdi-eye</v-icon>
                                    </v-chip>
                                </v-card-actions>

                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</div>
</template>

<script>
import axios from 'axios'
const web3 = require("@solana/web3.js");

import {
    Connection,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
    PublicKey
} from "@solana/web3.js";

import {
    getParsedNftAccountsByOwner,
    isValidSolanaAddress,
    createConnectionConfig,
} from "@nfteyez/sol-rayz";

import {
    AccountLayout,
    MintInfo,
    MintLayout,
    u64
} from '@solana/spl-token';
import {
    METADATA_PROGRAM_ID
} from '../utils/program'

import NFTs from '@primenums/solana-nft-tools'

const METADATA_PREFIX = "metadata";

const meta = require("../utils/metadata");

import cache from '../utils/cache'

import {
    TOKEN_PROGRAM_ID
} from '../utils/program'
/** TTL for toPublicKey cache */
const CACHE_PK_TTL_MINS = 1;
let OrbitSpinner = null;
const METADATA_REPLACE = new RegExp("\u0000", "g");
import {
    BinaryReader,
    BinaryWriter,
    deserializeUnchecked
} from 'borsh';

const COMMITMENT_CONFIRMED = 'confirmed';
const COMMITMENT_PROCESSED = 'processed';
if (process.client) {
    OrbitSpinner = require('epic-spinners').OrbitSpinner
}

export default {
    components: {
        OrbitSpinner
    },
    data() {
        return {
            nfts: [],
            loading: true,
            connect: ''
        }
    },
    computed: {
        walletAddress() {
            return this.$store.state.wallet.walletAddress
        }
    },
    watch: {
        walletAddress(newValue, oldValue) {
            if (newValue != oldValue) {
                this.getAllNftData()
            }
        }
    },
    mounted() {
        // console.log('meta:',meta)
        this.connect = new web3.Connection(web3.clusterApiUrl('mainnet-beta'), 'confirmed');
        this.getAllNftData()
        // var result = this.getNftsByOwner(this.connect, this.walletAddress, 1, 1, 1)
        // console.log('result:', result)
    },
    methods: {
        Metadata(args) {
            this.key = MetadataKey.MetadataV1;
            this.updateAuthority = args.updateAuthority;
            this.mint = args.mint;
            this.data = args.data;
            this.primarySaleHappened = args.primarySaleHappened;
            this.isMutable = args.isMutable;
            this.editionNonce = args.editionNonce;
        },
        Data(args) {
            this.name = args.name;
            this.symbol = args.symbol;
            this.uri = args.uri;
            this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
            this.creators = args.creators;
        },
        async decodeMetadata(buffer) {
            var metadata = deserializeUnchecked(
                meta.METADATA_SCHEMA,
                meta.Metadata,
                meta.buffer
            );

            metadata.data.name = metadata.data.name.replace(METADATA_REPLACE, "");
            metadata.data.uri = metadata.data.uri.replace(METADATA_REPLACE, "");
            metadata.data.symbol = metadata.data.symbol.replace(METADATA_REPLACE, "");

            return metadata;
        },
        async getMintTokenMeta(conn, mintPubKey) {
            const metaPubKey = await this.getMetadataAccount(mintPubKey);

            // get meta account info
            const metaAcc = await conn.getAccountInfo(metaPubKey, COMMITMENT_CONFIRMED);
            if (metaAcc === null) {
                return null;
            }

            // finally, decode metadata
            return meta.decodeMetadata(metaAcc.data);
        },
        async getMintTokenOwner(conn, mintPubKey) {
            let largestAccs = [];
            try {
                largestAccs = await conn.getTokenLargestAccounts(mintPubKey, COMMITMENT_CONFIRMED);
            } catch (err) {
                return {
                    error: err.message
                };
            }
            // NFT mint address should have amount 1 and it should be total supply
            const largesrAccWithAmt1 = largestAccs.value.filter(v => v.amount === '1');
            if (largesrAccWithAmt1.length === 0) {
                return {
                    error: 'Mint address is not NFT.'
                };
            }
            // also used as NFT ID in Phantom wallet
            const ownerAccPubKey = largesrAccWithAmt1[0].address;
            const ownerAcc = await this.connect.getParsedAccountInfo(this.toPublicKey(ownerAccPubKey));

            return {
                id: ownerAccPubKey.toBase58(),
                owner: ownerAcc.value.data.parsed.info.owner
            };
        },
        async getNFTByMintAddress(conn, mintAddr) {
            const mintPubKey = this.toPublicKey(mintAddr);

            const [metaData, {
                id,
                owner,
                error
            }] = await Promise.all([
                this.getMintTokenMeta(conn, mintPubKey),
                this.getMintTokenOwner(conn, mintPubKey)
            ]);

            if (metaData === null || error) {
                return {
                    mint: mintAddr,
                    error: error || 'Failed to parse metadata.'
                };
            }
            const res = await toNFT(id, owner, metaData);
            return res;
        },
        toPublicKey(key) {
            if (typeof key !== "string") {
                return key;
            }

            const cacheKey = `pk-${key}`;
            let result = cache.get(cacheKey);
            if (!result) {
                result = new PublicKey(key);
                cache.add(cacheKey, result, CACHE_PK_TTL_MINS);
            }
            return result;
        },
        async getMintTokensByOwner(conn, walletAddr, cacheTtlMins = null) {
            const cacheKey = `getMintTokensByOwner-${walletAddr}`;
            let tokens = cache.get(cacheKey);
            if (tokens) {
                return tokens;
            }

            const tokenAccs = await this.connect.getParsedTokenAccountsByOwner(
                this.toPublicKey(walletAddr), {
                    programId: this.toPublicKey(TOKEN_PROGRAM_ID),
                    COMMITMENT_PROCESSED
                },
            );

            tokens = tokenAccs.value.map(t => t.account.data.parsed.info.mint);

            if (cacheTtlMins) {
                cache.add(cacheKey, tokens, cacheTtlMins);
            }

            return tokens;

        },
        async getMetadataAccount(mintPubKey) {
            const metaProgPubKey = this.toPublicKey(METADATA_PROGRAM_ID);
            const seeds = [
                Buffer.from(METADATA_PREFIX),
                metaProgPubKey.toBuffer(),
                mintPubKey.toBuffer(),
            ];
            const result = await PublicKey.findProgramAddress(seeds, metaProgPubKey);
            // TODO: describe the result
            return result[0];
        },
        async toAPIRequest(id, method, params) {
            return {
                "jsonrpc": "2.0",
                "id": id,
                "method": method,
                "params": params
            };
        },
        async getNftsByOwner(conn, walletAddr, page = 1, size = 10, cacheTtlMins = null) {
            const tokens = await this.getMintTokensByOwner(conn, walletAddr, cacheTtlMins);
            const start = (page - 1) * size;
            const end = start + size;
            const mints = tokens.slice(start, end);

            if (!mints.length) {
                return [];
            }

            if (mints.length === 1) {
                return [
                    await this.getNFTByMintAddress(conn, mints[0])
                ];
            }

            const mintsHash = {};

            const toMetaBatchKey = mint => `meta-${mint}`;
            const toLargestAccBatchKey = mint => `largest-${mint}`;
            const toOwnerBatchKey = mint => `owner-${mint}`;

            // get meta pub keys
            let meatPubKeyPromises = [];
            for (const mint of mints) {
                meatPubKeyPromises.push(
                    meta.getMetadataAccount(this.toPublicKey(mint))
                    .then(metaPubKey => mintsHash[mint] = {
                        metaPubKey
                    })
                );
            }
            await Promise.all(meatPubKeyPromises);

            // in first batch we request meta accounts, and largest token accounts
            let batchBody1 = [];
            for (const mint of mints) {
                const metaPubKey = mintsHash[mint]['metaPubKey'];
                const metaBatchResKey = toMetaBatchKey(mint);
                const largestAccsBatchResKey = toLargestAccBatchKey(mint);
                // store items in hash by mint key, to access them later
                mintsHash[mint] = {
                    metaBatchResKey,
                    largestAccsBatchResKey
                };
                // meta acc info
                batchBody1.push(
                    toAPIRequest(
                        metaBatchResKey,
                        'getAccountInfo',
                        [metaPubKey.toBase58(), {
                            'encoding': 'base64'
                        }]
                    )
                );
                // largest accs
                batchBody1.push(
                    toAPIRequest(
                        largestAccsBatchResKey,
                        'getTokenLargestAccounts',
                        [mint]
                    )
                );
            }
            const batchRes1 = await rawAPIRequest(conn, batchBody1);

            let batchBody2 = [];
            for (const mint of mints) {
                // find meta
                const metaAcc = batchRes1.filter(r => r.id === mintsHash[mint].metaBatchResKey)[0].result.value;
                mintsHash[mint]['metadata'] = meta.decodeMetadata(Buffer.from(metaAcc.data[0], 'base64'));

                // find largest acc to make another batch
                const largestAccs = batchRes1.filter(r => r.id === mintsHash[mint].largestAccsBatchResKey)[0].result.value;
                const ownerAccAddr = largestAccs.filter(v => v.amount === '1')[0].address;
                const ownerBatchResKey = toOwnerBatchKey(mint);
                mintsHash[mint]['ownerBatchResKey'] = ownerBatchResKey;
                mintsHash[mint]['ownerAccAddr'] = ownerAccAddr;
                batchBody2.push(
                    toAPIRequest(
                        ownerBatchResKey,
                        'getAccountInfo',
                        [ownerAccAddr, {
                            'encoding': 'jsonParsed'
                        }]
                    )
                );
            }
            const batchRes2 = await rawAPIRequest(conn, batchBody2);
            // finally compose all the data and map NFTs
            let resPromises = [];
            for (const mint of mints) {
                const ownerAcc = batchRes2.filter(r => r.id === mintsHash[mint].ownerBatchResKey)[0].result.value;
                resPromises.push(
                    toNFT(
                        mintsHash[mint]['ownerAccAddr'],
                        ownerAcc.data.parsed.info.owner,
                        mintsHash[mint]['metadata'])
                );
            }

            const res = await Promise.all(resPromises);

            return res;

        },
        getProvider() {
            if ("solana" in window) {
                const provider = window.solana;
                if (provider.isPhantom) {
                    return provider;
                }
            }

        },

        async getAllNftData() {
            //magic eden method
            axios.get('https://api-mainnet.magiceden.io/rpc/getNFTsByOwner/' + this.walletAddress)
                .then(res => {
                    for (var x = 0; x < res.data.results.length; x++) {
                        if (this.walletAddress == res.data.results[x].owner) {
                            this.nfts.push(res.data.results[x])
                        }
                    }
                })
                .catch(err => console.log(err.respoonse))

            // let addrs = new web3.PublicKey(this.walletAddress)
            // let connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');

            // var res = await connection.getTokenAccountsByOwner(addrs, {
            //     programId: new web3.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
            // })
            // console.log(res)
            // console.log('res:', res.value[0].pubkey.toBase58())
            // console.log('res:', res.value[0].account.data)
            // for (var x = 0; x < res.value.length; x++) {
            //     var mint = this.deserialize(res.value[x].account.data)
            //     console.log('mint:', mint)
            // }

            // axios.get('https://explorer.solana.com/address/'+this.walletAddress+'/tokens?cluster=devnet')
            // .then(res=>console.log(res.data))

            const connect = createConnectionConfig(clusterApiUrl("devnet"));
            // const connect = createConnectionConfig(clusterApiUrl("mainnet-beta"));

            //first getting mint addresses and then fetching using those mints
            // let mints = await NFTs.getMintTokensByOwner(connect, this.walletAddress);
            // console.log('mints', mints);

            // for (let i = 0; i < mints.length; i++) {
            //     let myNFT = await NFTs.getNFTByMintAddress(connect, mints[i]);

            //     if (myNFT.owner == this.walletAddress) {
            //         console.log('myNFT', myNFT);
            //         this.nfts.push(myNFT)
            //     }

            // }

            //all nfts by owner at once
            // let allMyNFTs = await NFTs.getNFTsByOwner(connect, new web3.PublicKey(this.walletAddress));
            // console.log(allMyNFTs)
            // this.nfts = allMyNFTs
            // console.log('allMyNFTs', allMyNFTs);

            //paginate fetching by owner
            // let page = 1;
            // const perPage = 5;
            // const cacheTtlMins = 1;
            // var fetch = true;
            // while (fetch == true) {
            //     let myNft = await NFTs.getNFTsByOwner(connect, this.walletAddress, page, perPage, cacheTtlMins)
            //     console.log(myNft)

            //     if (myNft.length == 0) {
            //         fetch = false
            //     } else {
            //         for (var x = 0; x < myNft.length; x++){
            //             if (!myNft[x].error) {
            //                 if (myNft[x].owner == this.walletAddress) {
            //                     this.nfts.push(myNft[x])
            //                     this.loading = false
            //                 }
            //             }
            //         }
            //         page++
            //     }
            // }

            // let myNFT = await NFTs.getNFTByMintAddress(connect, mint[0].mint);
            // console.log('nft:',myNFT)
            //     page++
            // if(mynft==''){
            //     fetch=false
            //     console.log(stopped)
            // }
            // else{
            //     this.nfts.push(mynft)
            // }

            // while (x < 5) {
            //     let mynft = await NFTs.getNFTsByOwner(connect, this.walletAddress, page, perPage, cacheTtlMins);
            //     console.log('mynft:', mynft)
            //     page++
            // }

            //sabai fetch nagarne no fix sequence
            // try {
            //     // const connect = createConnectionConfig(clusterApiUrl("mainnet-beta"));
            //     const connect = createConnectionConfig(clusterApiUrl("devnet"));
            //     const provider = this.getProvider()
            //     let ownerToken = provider.publicKey
            //     const result = isValidSolanaAddress(ownerToken)
            //     const tokens = await getParsedNftAccountsByOwner({
            //         publicAddress: ownerToken,
            //         connection: connect,
            //         serialization: true,
            //     });
            //     var data = Object.keys(tokens).map((key) => tokens[key]);
            //     console.log('collection:',tokens)
            //     let n = data.length;
            //     let arr = []

            //     for (let i = 0; i < n; i++) {
            //         let val = await axios.get(data[i].data.uri);
            //         this.nfts.push(val);
            //         this.loading = false
            //     }
            // } catch (error) {
            //     console.log(error);
            // }
        },

    }
}
</script>

<style lang="css">
.desc-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
</style>
