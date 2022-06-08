<template>
<div class="dark-bg py-16">
    <v-container class="py-16">
        <v-row justify="center">
            <v-col cols="12" lg="7">
                <div class="enclose-border">
                    <v-form v-model="valid" ref="form">
                        <label for="name" class="text--disabled">Gallery Name</label>
                        <v-textarea v-model="name" :rules="[validRules.required,validRules.lengthMin3,validRules.lengthMax50]" id="name" rows="1" dense outlined placeholder="e.g. 'My Best NFT'"></v-textarea>

                        <label for="about" class="text--disabled">Short story about your Gallery</label>
                        <v-textarea v-model="about" :rules="[validRules.required,validRules.lengthMax100]" id="about" rows="3" auto-grow background-color="#030537" dense outlined placeholder="e.g.'The fact that makes this gallery worth watch...'"></v-textarea>

                        <div v-if="!editing">
                            <label for="type" class="text--disabled">Select</label>
                            <v-radio-group class="py-0" v-model="premium" row dense id="type">
                                <v-radio label="Premium Gallery" color="#c202d3" :value="true"></v-radio>
                                <v-radio label="Free Gallery" color="#c202d3" :value="false"></v-radio>
                            </v-radio-group>
                        </div>

                        <label for="price" v-if="premium" class="text--disabled">Price</label>
                        <v-text-field v-model="price" type="number" v-if="premium" :rules="[validRules.required, validRules.positive,validRules.sollimit]" :hint="getHint()" persistent-hint id="price" filled background-color="#030537" dense outlined placeholder="e.g. '0.01 SOL'"></v-text-field>

                        <v-row class="py-4">
                            <v-col cols="12" class="py-0">
                                <label for="story" class="text--disabled text-left">Story</label>
                            </v-col>
                            <v-col cols="5" align="center" class="px-15">
                                <client-only>
                                    <VueSlickCarousel v-bind="slickSetting2" ref="carousel">
                                        <div v-for="(item, i) in collection" :key="i" class="py-3">
                                            <v-img :src="item.image"></v-img>
                                            <span>{{i+1}} of {{collection.length}}</span>
                                        </div>
                                    </VueSlickCarousel>
                                </client-only>

                            </v-col>
                            <v-col cols="7">
                                <v-textarea v-model="story" @input="addStory()" color="#030537" rows="4" background-color="#030537" solo dark placeholder="Tell us your short story about nft"></v-textarea>
                                <v-row justify="end" no-gutters>
                                    <div class="outer-btn" @click="prev()">
                                        <div class="inner-btn">
                                            <p class="mt-n1 ml-2" style="font-size: 14px">
                                                <v-icon>mdi-chevron-double-left</v-icon>Prev
                                            </p>
                                        </div>
                                    </div>
                                    <div class="outer-btn ml-2" @click="next()">
                                        <div class="inner-btn">
                                            <p class="mt-n1 ml-2" style="font-size: 14px">Next<v-icon>mdi-chevron-double-right</v-icon>
                                            </p>
                                        </div>
                                    </div>
                                </v-row>
                            </v-col>
                        </v-row>

                        <v-row class="mt-2" no-gutters>
                            <v-checkbox class="mt-n2" :rules="[validRules.required]" color="white" v-model="agree"></v-checkbox>
                            <small>I understand that and I am ready to pay 0.01 SOL to create
                                this gallery.</small>
                        </v-row>
                    </v-form>
                    <v-row>
                        <v-btn class="mx-auto my-5 btn-exhibit" @click="createGallery()" :loading="creating">{{btnText}}</v-btn>
                    </v-row>
                </div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" lg="5" md="3" align="center">
                <p>
                    <small class="text--disabled">Choose your featured gallery image</small>
                </p>
                <div class="upload-box pa-3">
                    <v-img :src="src" max-width="150"></v-img>
                </div>
                <div class="enclose-border ma-3">
                    <v-row no-gutters>
                        <small>Total: {{collection.length}} items</small>
                        <v-spacer></v-spacer>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn x-small text dark v-bind="attrs" v-on="on">
                                    <small>More Actions</small>
                                    <v-icon small>mdi-chevron-down</v-icon>
                                </v-btn>
                            </template>
                            <v-list dense>
                                <v-list-item @click="addDialog=true">
                                    <v-list-item-title>Add Nfts</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="deleteDialog = true">
                                    <v-list-item-title>Delete Nfts</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-row>
                    <client-only>
                        <VueSlickCarousel v-bind="slickSetting">
                            <div v-for="(item, i) in collection" :key="i" class="py-3" @click="selectImage(item)">
                                <v-img :src="item.image" class="mx-auto" width="75" height="75"></v-img>
                            </div>
                        </VueSlickCarousel>
                    </client-only>
                </div>
                <!-- <p class="caption white--text mb-2 text-left">Note:</p>
                <small class="dark-text text-left">Service fee:2%</small><br /> -->
                <!-- <small class="dark-text" sty>You will receive: 25.00eth $50,00</small> -->
            </v-col>
        </v-row>
    </v-container>
    <!-- submit confirm -->
    <v-dialog v-model="confirmDialog" max-width="400" persistent>
        <div class="dark-bg">
            <v-card outlined class="rounded-lg pa-4">
                <v-card-title>Create now?</v-card-title>
                <v-card-actions>
                    <div class="outer-btn" @click="confirmDialog=false">
                        <div class="inner-btn">
                            <p class="mt-n1 ml-2 text-center" style="font-size: 14px">
                                Cancel
                            </p>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <div class="outer-btn" @click="createGallery()">
                        <div class="inner-btn">
                            <p class="mt-n1 ml-2 text-center" style="font-size: 14px">
                                Confirm
                            </p>
                        </div>
                    </div>
                </v-card-actions>
            </v-card>
        </div>

    </v-dialog>
    <!-- end submit confirm -->

    <!-- delete nft -->
    <v-dialog v-model="deleteDialog" max-width="600" persistent>
        <v-card color="background">
            <v-card-title>Remove Nfts</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="6" v-for="(item,i) in collection" :key="i">
                            <v-card class="outer-card rounded-lg" style="height: 55px;">
                                <div class="inner-card pa-1 rounded-lg" style="height: 53px;">
                                    <v-list dense style="
                        background-color: transparent;
                        box-shadow: none !important;
                      " class="py-0">
                                        <v-list-item class="px-0">
                                            <v-list-item-avatar tile class="rounded-lg my-0">
                                                <v-img :src="item.image" :lazy-src="item.image">
                                                    <template v-slot:placeholder>
                                                        <v-row class="fill-height ma-0" align="center" justify="center">
                                                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                        </v-row>
                                                    </template>
                                                </v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item-content>
                                            <v-list-item-action>
                                                <div v-if="collection.includes(item)" @click="$store.commit('nft/deselectNft', item)">
                                                    <v-checkbox color="green" disabled v-model="yes" dark></v-checkbox>
                                                </div>
                                                <div v-else @click="$store.commit('nft/selectNft', item)">
                                                    <v-checkbox color="green" v-model="no" disabled dark></v-checkbox>
                                                </div>

                                            </v-list-item-action>
                                        </v-list-item>
                                    </v-list>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small outlined dark @click="deleteDialog=false">Done</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- end delete nft -->

    <!-- add nft -->
    <v-dialog v-model="addDialog" max-width="1200" persistent>
        <v-card color="background">
            <p class="text-center">Add Nfts</p>
            <v-card-text style="max-height:500px;overflow:hidden">
                <Exhibit />
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small outlined dark @click="addDialog=false">Done</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- end delete nft -->

</div>
</template>

<script>
import Exhibit from '../../../components/profile/exhibit.vue'
const web3 = require("@solana/web3.js");
const getProvider = async () => {
    if ("solana" in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
            return provider;
        }
    } else {
        window.open("https://www.phantom.app/", "_blank");
    }
};
export default {
    components: {
        Exhibit
    },
    layout: "user",
    data() {
        return {
            connection: new web3.Connection(
                web3.clusterApiUrl(process.env.CLUSTER),
                "confirmed"
            ),
            sol: 0,
            attributes: [],
            agree: true,
            valid: true,
            name: "",
            about: "",
            price: "",
            story: '',
            src: null,
            public_id: "",
            creating: false,
            isSelecting: false,
            validRules: {
                required: (value) => !!value || "Required.",
                agree: (value) => !!value || "You must agree.",
                length10: (v) => (v && v.length == 10) || "Should be 10 characters.",
                positive: (v) => (v && v > -1) || "Price cannot be negative.",
                lengthMax100: (v) => (v && v.length < 200) || "Should not be more than 200 characters.",
                lengthMin3: (v) => (v && v.length > 2) || "At least 3 characters.",
                lengthMax50: (v) => (v && v.length < 50) || "Should be less than 50 characters.",
                sollimit: (v) => (v && v <= 20 / this.sol) || "SOL should not worth more than 20$. Current price: 20$=" + (20 / this.sol).toFixed(4) + " SOL"
            },
            slickSetting: {
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                rows: 2
            },
            slickSetting2: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
            },
            rankedNfts: [],
            approvalDialog: false,
            priceDisabled: false,
            premium: true,
            selectedIndex: 0,
            confirmDialog: false,
            deleteDialog: false,
            templist: [],
            yes: true,
            no: true,
            addDialog: false,
            btnText: 'Create Gallery'
        };
    },
    computed: {
        collection() {
            return this.$store.state.nft.collection;
        },
        walletAddress() {
            return this.$route.params.address
        },
        selected() {
            return this.$store.state.content.selected
        },
        editing() {
            return this.$store.state.content.editing
        }
    },
    watch: {
        collection() {
            if (this.collection.length == 0) {
                this.$router.push({
                    name: 'profile-address-index-exhibit',
                    params: {
                        address: this.walletAddress
                    }
                })
            }
        },
        premium() {
            if (this.premium == true) {
                this.priceDisabled = true
            } else {
                this.priceDisabled = false
            }
            this.price = ""
        }
    },
    beforeRouteLeave(to, from, next) {
        this.$store.commit("content/setEditing", false);
        next();
    },
    mounted() {
        if (this.editing) {
            this.btnText = 'Update'
        }
        if (this.collection.length > 0) {
            this.src = this.collection[0].image;
        } else {
            this.$router.push({
                name: 'profile-address-index-exhibit',
                params: {
                    address: this.walletAddress
                }
            })
        }
        this.getSolValue()
        if (this.editing == true) {
            this.setFields()
        }
        // this.setAttributes();

    },
    methods: {
        addNewNft() {

        },
        setFields() {
            this.name = this.selected.gallery_name
            this.about = this.selected.description
            this.premium = this.selected.premium
            this.src = this.selected.image
            this.price = this.selected.price
        },
        next() {
            this.$refs.carousel.next()
            this.selectedIndex += 1
            if (this.collection.length == this.selectedIndex) {
                this.confirmDialog = true
                this.selectedIndex -= 1
            }
            this.story = this.collection[this.selectedIndex].story

        },
        prev() {
            this.$refs.carousel.prev()
            this.selectedIndex -= 1
            if (this.selectedIndex < 0) {
                this.selectedIndex += 1
            }
            this.story = this.collection[this.selectedIndex].story

        },
        addStory() {
            this.collection[this.selectedIndex]['story'] = this.story

        },
        getSolValue() {
            this.$axios.get('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd')
                .then(res => this.sol = res.data.solana.usd)
                .catch(err => console.log(err.response))
        },
        getHint() {
            return "SOL should not worth more than 20$. Current price: 20$=" + (20 / this.sol).toFixed(4) + " SOL"
        },
        setAttributes() {
            // getting all trait value
            for (var x = 0; x < this.collection.length; x++) {
                for (var y = 0; y < this.collection[x].attributes.length; y++) {
                    this.attributes.push(this.collection[x].attributes[y].value);
                }
            }
            this.setRankScore();
        },
        setRankScore() {
            let points = [];
            const map = this.attributes.reduce(
                (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
                new Map()
            );
            points = [...map.entries()];

            let rank = [];
            for (var x = 0; x < this.collection.length; x++) {
                let tempattrs = [];
                let nftPoint = 0;
                for (var y = 0; y < this.collection[x].attributes.length; y++) {
                    //putting trat value of each nft one by one in tempattrs
                    tempattrs.push(this.collection[x].attributes[y].value);
                }
                for (var z = 0; z < points.length; z++) {
                    if (tempattrs.includes(points[z][0])) {
                        nftPoint += points[z][1];
                    }
                }
                rank.push({
                    name: this.collection[x].name,
                    point: nftPoint,
                    attrcount: this.collection[x].attributes.length,
                });
            }
            rank.sort((a, b) => {
                return a.point - b.point;
            });
            let sorted = [];
            for (var x = 0; x < rank.length; x++) {
                for (var y = 0; y < rank.length; y++) {
                    if (rank[x].name == this.collection[y].name) {
                        sorted[x] = this.collection[y];
                    }
                }
            }
            this.rankedNfts = sorted;
        },
        async createGallery() {
            this.confirmDialog = false
            if (this.$refs.form.validate()) {
                if (this.src != null) {
                    this.creating = true;
                    const depositData = {
                        sender: this.walletAddress,
                        amount: 0.01,
                    };
                    var total_charge = 0.01;
                    var lamports = await this.connection.getBalance(
                        new web3.PublicKey(this.walletAddress)
                    );
                    var available = parseFloat(lamports * 0.000000001).toFixed(5);
                    // console.log('total charge')
                    if (this.editing == false) {
                        if (total_charge < available) {
                            if (this.premium == false) {
                                this.price = 0
                            }
                            // Getting wallet address
                            var provider = await getProvider();

                            var recieverWallet = new web3.PublicKey("9wGdQtcHGiV16cqGfm6wsN5z9hmUTiDqN25zsnPu1SDv");

                            var transaction = new web3.Transaction().add(
                                web3.SystemProgram.transfer({
                                    fromPubkey: provider.publicKey,
                                    toPubkey: recieverWallet,
                                    lamports: web3.LAMPORTS_PER_SOL / 100
                                }),
                            );

                            // Setting the variables for the transaction
                            transaction.feePayer = await provider.publicKey;
                            let blockhashObj = await this.connection.getRecentBlockhash();
                            transaction.recentBlockhash = await blockhashObj.blockhash;

                            // Request creator to sign the transaction (allow the transaction)
                            let signed = await provider.signTransaction(transaction);
                            // The signature is generated
                            let signature = await this.connection.sendRawTransaction(signed.serialize());
                            // // Confirm whether the transaction went through or not
                            // await connection.confirmTransaction(signature);
                            // console.log("Signature: ", signature);

                            this.$axios
                                .post("/create-gallery", {
                                    'user_id': this.walletAddress,
                                    'gallery_name': this.name,
                                    'nfts': this.collection,
                                    'image': this.src,
                                    'description': this.about,
                                    'price': this.price,
                                    'premium': this.premium
                                })
                                .then((res) => {
                                    this.creating = false;
                                    this.approvalDialog = false
                                    this.$toast
                                        .success("Your gallery has been created successfully.", {
                                            iconPack: "mdi",
                                            icon: "mdi-image",
                                            theme: "outline",
                                        })
                                        .goAway(3000);
                                    this.$store.commit("content/setSelected", res.data.gallery);
                                    this.$router.push({
                                        name: "profile-preview",
                                    });
                                })
                                .catch((err) => console.log(err.response));

                        } else {
                            this.creating = false;
                            this.$toast
                                .error("Insufficient fund.", {
                                    iconPack: "mdi",
                                    icon: "mdi-wallet",
                                    theme: "outline",
                                })
                                .goAway(3000);
                        }
                    } else {
                        this.$axios
                            .patch("/gallery/" + this.selected._id, {
                                'user_id': this.walletAddress,
                                'gallery_name': this.name,
                                'nfts': this.collection,
                                'image': this.src,
                                'description': this.about,
                                'price': this.price,
                                'premium': this.premium
                            })
                            .then((res) => {
                                this.creating = false;
                                this.approvalDialog = false
                                this.$toast
                                    .success("Your gallery has been updated successfully.", {
                                        iconPack: "mdi",
                                        icon: "mdi-image",
                                        theme: "outline",
                                    })
                                    .goAway(3000);
                                this.$store.commit("content/setSelected", res.data.result);
                                this.$router.push({
                                    name: "profile-preview",
                                });
                            })
                            .catch((err) => console.log(err.response));
                    }

                } else {
                    this.$toast
                        .error("Please select a featured image.", {
                            iconPack: "mdi",
                            icon: "mdi-image",
                            theme: "outline",
                        })
                        .goAway(3000);
                }
            }
        },
        selectImage(item) {
            this.src = item.image;
        },
    },
};
</script>

<style lang="css">
.upload-box {
    width: 175px;
    min-height: 200px;
    border: 1px dashed #c202d3;
}

.dark-text {
    color: #1103a2;
}

.v-input__slot {
    box-shadow: none !important;
    caret-color: white;
}

.outer-btn {
    border-radius: 25px;
}

.inner-btn {
    border-radius: 25px;

}

.theme--dark.v-sheet--outlined {
    border: 1px solid white;
}
</style>
