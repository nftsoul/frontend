<template>
<div class="dark-bg py-16">
    <v-container class="py-16">
        <v-row justify="center">
            <v-col cols="12" lg="3" md="3">
                <p class="caption dark-text mb-0">Featured Gallery Image</p>
                <p><small class="text--disabled">Drag or choose your file to upload</small></p>
                <div class="upload-box pa-3">
                    <div v-if="src==null">
                        <p class="text-center mt-10 mb-0">
                            <v-btn x-large icon :loading="isSelecting" @click="onButtonClick">
                                <v-icon size="50" color="#1103A2">mdi-upload</v-icon>
                            </v-btn>

                            <input ref="uploader" class="d-none" type="file" accept="image/*" @change="onFileChanged" />
                        </p>
                        <p class="caption text-center dark-text">Choose a file</p>
                        <p class="body-2 text--disabled text-center">JPG, GIF, WEBP, MP4 OR MP3 <br>MAX 3MB</p>
                    </div>
                    <v-img :src="src" v-else class="rounded-lg"></v-img>
                </div>
                <p class="caption white--text mb-2 mt-16">Note:</p>
                <small class="dark-text">Service fee:2.5%</small><br>
                <small class="dark-text" sty>You will receive: 25.00eth $50,00</small>
            </v-col>
            <v-col cols="12" lg="5">
                <div class="enclose-border">
                    <v-form v-model="valid" ref="form">

                        <label for="name" class="text--disabled">Gallery Name</label>
                        <v-text-field v-model="name" :rules="[validRules.required]" id="name" height="10" filled background-color="#030537" dense outlined placeholder="e.g. 'My Best NFT'"></v-text-field>

                        <label for="about" class="text--disabled">About the gallery short info</label>
                        <v-textarea v-model="about" :rules="[validRules.required]" id="about" rows="3" auto-grow filled background-color="#030537" dense outlined placeholder="e.g.'After purchasing the item you can get the item....'"></v-textarea>

                        <label for="price" class="text--disabled">Price</label>
                        <v-text-field v-model="price" :rules="[validRules.required]" id="price" filled background-color="#030537" dense outlined placeholder="e.g. '250 SOL'"></v-text-field>
                        <!-- <v-row no-gutters>
                            <small class="mr-5">
                                <v-checkbox label="Put on sale" dense dark></v-checkbox>
                            </small>
                            <small>
                                <v-checkbox label="Free Listing" dark dense></v-checkbox>
                            </small>
                        </v-row> -->
                    </v-form>
                    <v-row>
                        <v-btn class="mx-auto my-5 btn-exhibit" @click="createGallery()" :loading="creating">Create Gallery</v-btn>
                    </v-row>

                </div>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import axios from 'axios'
export default {
    layout: 'user',
    data() {
        return {
            valid: true,
            name: '',
            about: '',
            price: '',
            src: null,
            public_id: '',
            creating:false,
            isSelecting: false,
            validRules: {
                required: value => !!value || "Required.",
                length10: v => v && v.length == 10 || "Should be 10 characters",
            },
        }
    },
    computed: {
        collection() {
            return this.$store.state.nft.collection
        },
        walletAddress() {
            return this.$store.state.wallet.walletAddress
        }
    },
    methods: {
        createGallery() {
            if (this.$refs.form.validate()) {
                if (this.src != null) {
                    this.creating=true
                    // console.log(this.walletAddress,this.name,this.collection,this.public_id,this.about,this.price)
                    axios.post('https://nft-soul.herokuapp.com/api/create-gallery', {
                        user_id: this.walletAddress,
                        gallery_name: this.name,
                        nfts: this.collection,
                        image: this.public_id,
                        description: this.about,
                        price: this.price
                    }).then(res => {
                        console.log(res.data)
                        this.creating=false
                        this.$toast
                            .success("Your gallery has been created successfully.", {
                                iconPack: "mdi",
                                icon: "mdi-image",
                                theme: "outline"
                            })
                            .goAway(3000);
                            this.$store.commit('content/setSelected',res.data)
                            this.$router.push({
                                name:'profile-preview'
                            })

                    }).catch(err => console.log(err.response))
                } else {
                    this.$toast
                        .error("Please upload a featured image.", {
                            iconPack: "mdi",
                            icon: "mdi-image",
                            theme: "outline"
                        })
                        .goAway(3000);
                }
            }
        },
        onButtonClick() {
            this.$refs.uploader.click()
        },
        async onFileChanged(e) {
            this.isSelecting = true
            var file = e.target.files[0]

            const readData = f =>
                new Promise(resolve => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(f);
                });

            /* Read data */
            const data = await readData(file);

            /* upload the converted data */
            const instance = this.$cloudinary.upload(data, {
                    folder: "nftsoul/collection-featured",
                    uploadPreset: "jzzyk6rp"
                })
                .then(response => {
                    this.public_id = response.public_id
                    this.src = this.$cloudinary.image.url(
                        response.public_id, {
                            gravity: 'auto:subject',
                        }
                    )
                    this.isSelecting = false
                    console.log(this.src)
                })
                .catch(err => {
                    console.log(err);
                });
        },
    }
}
</script>

<style lang="css">
.upload-box {
    width: 250px;
    min-height: 200px;
    border: 1px dashed #C202D3;
}

.dark-text {
    color: #1103A2;
}

.v-input__slot {
    box-shadow: none !important;
}
</style>
