<template>
<div class="dark-bg py-16">
    <v-container class="py-16">
        <v-row justify="center">
            <v-col cols="12" lg="7">
                <div class="enclose-border">
                    <v-form v-model="valid" ref="form">
                        <label for="name" class="text--disabled">Gallery Name</label>
                        <v-textarea v-model="name" :rules="[validRules.required,validRules.lengthMin3]" id="name" rows="1" dense outlined placeholder="e.g. 'My Best NFT'"></v-textarea>

                        <label for="about" class="text--disabled">Short story about your collection</label>
                        <v-textarea v-model="about" :rules="[validRules.required,validRules.lengthMax100]" id="about" rows="3" auto-grow background-color="#030537" dense outlined placeholder="e.g.'The fact that makes this collection worth watch...'"></v-textarea>

                        <label for="type" class="text--disabled">Select</label>
                        <v-radio-group class="py-0" v-model="premium" row dense id="type">
                            <v-radio label="Premium Collection" color="#c202d3" :value="false"></v-radio>
                            <v-radio label="Free Collection" color="#c202d3" :value="true"></v-radio>
                        </v-radio-group>

                        <label for="price" class="text--disabled">Price</label>
                        <v-text-field v-model="price" type="number" v-if="!priceDisabled" :rules="[validRules.required, validRules.positive,validRules.sollimit]" :hint="getHint()" persistent-hint id="price" filled background-color="#030537" dense outlined placeholder="e.g. '0.01 SOL'"></v-text-field>

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
                                            <p class="mt-n1 ml-2" style="font-size: 14px"><v-icon>mdi-chevron-double-left</v-icon>Prev</p>
                                        </div>
                                    </div>
                                    <div class="outer-btn ml-2" @click="next()">
                                        <div class="inner-btn">
                                            <p class="mt-n1 ml-2" style="font-size: 14px">Next<v-icon>mdi-chevron-double-right</v-icon></p>
                                        </div>
                                    </div>
                                </v-row>
                            </v-col>
                        </v-row>

                        <v-row class="mt-2" no-gutters v-if="!priceDisabled">
                            <v-checkbox class="mt-n2" :rules="[validRules.required]" color="white" v-model="agree"></v-checkbox>
                            <small>I understand that and I am ready to pay 0.01 SOL to create
                                this premium gallery.</small>
                        </v-row>
                    </v-form>
                    <v-row>
                        <v-btn class="mx-auto my-5 btn-exhibit" @click="createGallery()" :loading="creating">Create Gallery</v-btn>
                    </v-row>
                </div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" lg="3" md="3">
                <p class="caption dark-text mb-0">Featured Gallery Image</p>
                <p>
                    <small class="text--disabled">Choose your file to upload</small>
                </p>
                <div class="upload-box pa-3">
                    <v-img :src="src"></v-img>
                </div>
                <div class="mx-3">
                    <client-only>
                        <VueSlickCarousel v-bind="slickSetting">
                            <div v-for="(item, i) in collection" :key="i" class="py-3" @click="selectImage(item)">
                                <v-img :src="item.image" class="mx-auto" width="50" height="50"></v-img>
                            </div>
                        </VueSlickCarousel>
                    </client-only>
                </div>
                <p class="caption white--text mb-2">Note:</p>
                <small class="dark-text">Service fee:2%</small><br />
                <!-- <small class="dark-text" sty>You will receive: 25.00eth $50,00</small> -->
            </v-col>
        </v-row>
    </v-container>

    <!-- approval dialog -->
    <v-dialog v-model="approvalDialog" max-width="400" persistent>
        <div class="border-white rounded-lg">
            <v-card color="primary" class="rounded-lg">
                <v-col align="center">
                    <p class="text--disabled">
                        <spinner :animation-duration="1200" :size="30" color="#fff" class="mx-auto" />Do not close this window
                    </p>
                    <p>Your gallery will be created after payment approval</p>
                    <p>{{ approvals }} Approvals Left</p>
                </v-col>
            </v-card>
        </div>
    </v-dialog>
    <!-- end approval dialog -->
</div>
</template>

<script>
let zebec = null;
if (process.client) {
    zebec = require("@zebec-protocol/stream");
}
const web3 = require("@solana/web3.js");

export default {
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
            story:'',
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
                sollimit: (v) => (v && v <= 20 / this.sol) || "SOL should not worth more than 20$. Current price: 20$=" + (20 / this.sol).toFixed(4) + " SOL"
            },
            slickSetting: {
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
            },
            slickSetting2: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
            },
            rankedNfts: [],
            approvalDialog: false,
            approvals: 2,
            priceDisabled: false,
            premium: false,
            selectedIndex: 0
        };
    },
    computed: {
        collection() {
            return this.$store.state.nft.collection;
        },
        walletAddress() {
            return this.$route.params.address
        },
    },
    watch: {
        premium() {
            if (this.premium == true) {
                this.priceDisabled = true
            } else {
                this.priceDisabled = false
            }
            this.price=""
        }
    },
    mounted() {
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

        // this.setAttributes();
    },
    methods: {
        next(){
            this.$refs.carousel.next()
            this.selectedIndex +=1
            if(this.collection.length == this.selectedIndex){
                this.selectedIndex -=1
            }
            this.story=this.collection[this.selectedIndex].story
            
        },
        prev(){
            this.$refs.carousel.prev()
            this.selectedIndex -=1
            if(this.selectedIndex < 0){
                this.selectedIndex +=1
            }
            this.story=this.collection[this.selectedIndex].story

        },
        addStory(){
            this.collection[this.selectedIndex]['story']=this.story
            
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
            if (this.$refs.form.validate()) {
                const zeb=new zebec.NativeStream(window.solana,process.env.CLUSTER_URL)
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
                    if (this.price > 0) {

                        if (total_charge < available) {
                            this.approvalDialog = true
                            let depositResponse = await zeb.deposit(depositData);
                            if (depositResponse.status == "success") {
                                this.approvals -= 1
                                let currentTime = Math.floor(Date.now() / 1000);
                                let futureTime = currentTime + 60;
                                let platformResponse = await zeb.init({
                                    sender: this.walletAddress,
                                    receiver: "9wGdQtcHGiV16cqGfm6wsN5z9hmUTiDqN25zsnPu1SDv",
                                    amount: 0.01,
                                    start_time: currentTime,
                                    end_time: futureTime,
                                });
                                if (platformResponse.status == "success") {

                                    this.$axios
                                        .post(process.env.baseUrl + "/create-gallery", {
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
                                            this.$store.commit("content/setSelected", res.data);
                                            this.$router.push({
                                                name: "profile-preview",
                                            });
                                        })
                                        .catch((err) => console.log(err.response));
                                } else {
                                    this.creating = false;
                                    this.approvalDialog = false
                                    this.approvals = 2
                                    this.$toast
                                        .error("User rejected the request", {
                                            iconPack: "mdi",
                                            icon: "mdi-cancel",
                                            theme: "outline",
                                        })
                                        .goAway(3000);
                                }
                            } else {
                                this.creating = false;
                                this.approvalDialog = false
                                this.approvals = 2
                                this.$toast
                                    .error("User rejected the request", {
                                        iconPack: "mdi",
                                        icon: "mdi-cancel",
                                        theme: "outline",
                                    })
                                    .goAway(3000);
                            }
                        } else {
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
                            .post(process.env.baseUrl + "/create-gallery", {
                                'user_id': this.walletAddress,
                                'gallery_name': this.name,
                                'nfts': this.collection,
                                'image': this.src,
                                'description': this.about,
                                'price': 0,
                                'premium': false
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
                                this.$store.commit("content/setSelected", res.data);
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
    width: 250px;
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
.outer-btn{
    border-radius:25px;
}
.inner-btn{
    border-radius:25px;

}
</style>
