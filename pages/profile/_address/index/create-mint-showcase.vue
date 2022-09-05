<template>
    <div class="dark-bg pt-16">
        <v-container class="mt-8">
            <v-row justify="center">
                <v-col cols="12" lg="6" md="8">
                    <h2 class="gradient-title text-center mb-5">Create Mint Showcase</h2>

                    <v-form ref="form" v-model="valid">
                        <label for="">Collection Name</label>
                        <FormCustomTextField inputtype="url" v-model="name"
                            :rules="[validRules.required, validRules.lengthMin3]" />

                        <label for="">Collection description</label>
                        <FormCustomTextArea v-model="description"
                            :rules="[validRules.required, validRules.lengthMax200]" />

                        <label for="">Roadmap</label>
                        <div v-for="(item, i) in roadmap" :key="i">
                            <p>Phase {{ i + 1 }}</p>
                            <FormCustomTextArea v-model="road.phases[i]"
                                :rules="[validRules.required, validRules.lengthMax200]" />
                        </div>
                        <v-btn color="#A0A0A0" dark class="mb-8" @click="roadmap += 1">
                            <v-icon>mdi-plus</v-icon>
                            Add More Phase
                        </v-btn>
                        <br>

                        <label for="">About Team</label>
                        <FormCustomTextArea v-model="about_team"
                            :rules="[validRules.required, validRules.lengthMax200, validRules.lengthMin3]" />

                        <v-row>
                            <v-col cols="6" v-for="i in team" :key="i">
                                <p>Member {{ i }}</p>
                                <label>Name</label>
                                <FormCustomTextField v-model="member.name[i]" />
                                <label>Role</label>
                                <FormCustomTextField v-model="member.role[i]" />
                                <label>Social Link</label>
                                <FormCustomTextField v-model="member.social_link[i]"
                                    :rules="[validRules.required, validRules.lengthMax200, validRules.validLink]" />
                                <v-col align="center">
                                    <v-avatar v-if="member.avatar[i]" class="mb-3" size="80">
                                        <v-img :src="member.avatar[i]"></v-img>
                                    </v-avatar>
                                    <br>
                                    <v-btn dark color="#FE87FF" small :loading="uploadavatar[i]"
                                        @click="event => selectAvatar(event, i)" class="mb-5">
                                        <v-icon>
                                            mdi-image-plus
                                        </v-icon>
                                        Upload Profile
                                    </v-btn>
                                </v-col>

                            </v-col>
                            <input ref="uploader" class="d-none" type="file" accept="image/png,image/jpg,image/jpeg"
                                @change="onAvatarUpload" />
                        </v-row>

                        <v-btn color="#A0A0A0" dark class="mb-8" @click="team += 1">
                            <v-icon>mdi-plus</v-icon>
                            Add Member
                        </v-btn>
                        <br>

                        <label for="">Twitter Link</label>
                        <FormCustomTextField v-model="twitter"
                            :rules="[validRules.required, validRules.lengthMin3, validRules.validLink, validRules.twitterLink]" />

                        <label for="">Discord Link</label>
                        <FormCustomTextField v-model="discord"
                            :rules="[validRules.required, validRules.lengthMin3, validRules.validLink, validRules.discordLink]" />

                        <label for="">Linkedin Profile</label>
                        <FormCustomTextField v-model="linkedin"
                            :rules="[validRules.required, validRules.lengthMin3, , validRules.validLink, validRules.linkedinLink]" />

                        <label for="">Email Address</label>
                        <FormCustomTextField v-model="email" :rules="[validRules.required, validRules.validEmail]" />

                        <v-row justify="center">
                            <v-col cols="12" lg="6" md="6">
                                <label for="">Mint Date</label>
                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                    transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="date" placeholder="YYY-MM-DD" dense outlined readonly
                                            v-bind="attrs" v-on="on" :rules="[validRules.required]"></v-text-field>
                                    </template>
                                    <v-date-picker light v-model="date" :active-picker.sync="activePicker"
                                        max="2030-01-01" min="2020-01-01" @change="save"></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12" lg="6" md="6">
                                <label for="" placeholder="eg: 0.02 sol">Mint Price</label>
                                <FormCustomTextField v-model="mintPrice" inputtype="number"
                                    :rules="[validRules.required, validRules.positive]" />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" align="center">
                                <div>
                                    <p>Upload File</p>
                                    <div style="border:1px solid #FE87FF" class="py-2">
                                        <p>10 NFTs Required</p>
                                        <client-only>
                                            <VueSlickCarousel v-bind="slickSetting" v-if="files.length > 0">
                                                <div class="d-flex flex-wrap">
                                                    <div class="flex-item mx-auto mb-2" v-for="(item, i) in files"
                                                        :key="i">
                                                        <v-img :src="item" class="rounded-lg white-border mx-2"
                                                            max-width="300">
                                                        </v-img>
                                                        <v-icon @click="removeFile(item)">mdi-close</v-icon>
                                                    </div>
                                                </div>

                                            </VueSlickCarousel>
                                            <v-container v-else>
                                                <v-row>
                                                    <v-col cols="12" lg="3" md="3" v-for="i in 10" :key="i">
                                                        <div class="img-slot" @click="selectImage">
                                                            <v-icon large class="mt-5">mdi-plus</v-icon>
                                                        </div>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </client-only>
                                        <v-btn dark color="#FE87FF" :loading="uploading" @click="selectImage"
                                            v-if="files.length > 0 && files.length < 10" class="mt-5">
                                            <v-icon>
                                                mdi-image-plus
                                            </v-icon>
                                            Upload More
                                        </v-btn><br>
                                        <small style="color:red" v-if="files.length > 0 && files.length < 10">10 nfts
                                            required to showcase.</small>
                                        <input ref="imageUploader" multiple class="d-none" type="file"
                                            accept="image/png,image/jpg,image/jpeg" @change="onImageUpload" />
                                    </div>
                                </div>

                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-btn class="btn-exhibit mt-5" @click="create()" :loading="saving">Submit</v-btn>
                        </v-row>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<!-- <script src="https://unpkg.com/vee-validate"></script> -->
<script>
import { constants } from 'buffer';

export default {
    data() {
        return {
            valid: true,
            roadmap: 3,
            team: 4,
            name: '',
            description: '',
            road: {
                phases: []
            },
            about_team: '',
            member: {
                name: [],
                role: [],
                social_link: [],
                avatar: []
            },
            twitter: '',
            discord: '',
            linkedin: '',
            email: '',
            mintPrice: '',
            files: [],
            saving: false,
            validRules: {
                required: (value) => !!value || "Required.",
                length10: (v) => (v && v.length == 10) || "Should be 10 characters.",
                positive: (v) => (v && v > 0) || "Price cannot be negative.",
                lengthMax200: (v) => (v && v.length < 200) || "Should not be more than 200 characters.",
                lengthMin3: (v) => (v && v.length > 2) || "At least 3 characters.",
                validEmail: v => /.+@.+\..+/.test(v) || "E-mail must be valid",
                validLink: v => /https?:[0-9]*\/\/[\w!?/\+\-_~=;\.,*&@#$%\(\)\'\[\]]+/.test(v) || 'URL must be valid',
                twitterLink: v => /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/ || 'Not a twitter link',
                discordLink: v => /^http(s*):\/\/(www.)*discord\.com\/[a-zA-Z0-9.]+$/i || 'Not a discord link',
                linkedinLink: v => /^http(s*):\/\/(www.)*linkedin\.com\/[a-zA-Z0-9.]+$/i || 'Not a Linkedin link'
            },
            uploading: false,
            activePicker: null,
            date: null,
            menu: false,
            avatarIndex: null,
            uploadavatar: {},
            slickSetting: {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
                rows: 3,
                responsive: [{
                    breakpoint: 1264,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false,
                        arrows: true,
                    },
                },
                {
                    breakpoint: 960,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2,
                        arrows: true,
                    },
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                    },
                },
                ],
            },

        }
    },
    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
    computed: {
        userAddress() {
            return this.$route.params.address
        }
    },
    methods: {
        async create() {
            if (this.$refs.form.validate()) {
                if (this.files.length < 10) {
                    this.$toast
                        .error("You must select 10 nfts.", {
                            iconPack: "mdi",
                            icon: "mdi-image",
                            theme: "outline",
                        })
                        .goAway(3000);
                } else {

                    //arranging team data
                    this.saving = true
                    let finalmem = []
                    for (var x = 0; x < this.member.name.length - 1; x++) {
                        finalmem.push({
                            name: this.member.name[x + 1],
                            role: this.member.role[x + 1],
                            social_link: this.member.social_link[x + 1],
                            avatar: this.member.avatar[x + 1]
                        })
                    }
                    if (finalmem.length > 0) {
                        this.$axios.post('/mint/create', {
                            collection_name: this.name,
                            description: this.description,
                            roadmap: this.road.phases,
                            about_team: this.about_team,
                            members: finalmem,
                            social: {
                                'twitter': this.twitter,
                                'discord': this.discord,
                                'linkedin': this.linkedin
                            },
                            date: this.date,
                            email: this.email,
                            price: this.mintPrice,
                            image: this.files[0],
                            images: this.files
                        })
                            .then(res => {
                                this.$toast
                                    .success("Your mint showcase has been created successfully.", {
                                        iconPack: "mdi",
                                        icon: "mdi-image",
                                        theme: "outline",
                                    })
                                    .goAway(3000);
                                this.$router.push('/profile/' + this.userAddress + '/mint-showcase')
                                this.saving = false
                            })
                            .catch(err => console.log(err.response))
                    }
                    else {
                        this.$toast
                            .error("At least one team member is required", {
                                iconPack: "mdi",
                                icon: "mdi-account",
                                theme: "outline",
                            })
                            .goAway(3000);
                    }
                }
            }
        },

        selectImage() {
            this.$refs.imageUploader.click();
        },
        selectAvatar(event, index) {
            this.avatarIndex = index
            this.$refs.uploader.click();
        },
        removeFile(item) {
            this.files.splice(this.files.indexOf(item), 1)
        },
        save(date) {
            this.$refs.menu.save(date)
        },
        async onAvatarUpload(e) {
            this.uploadavatar[this.avatarIndex] = true
            this.$forceUpdate()
            var file = e.target.files[0];
            let data

            const reader = new FileReader()
            reader.addEventListener('load', () => {
                data = reader.result
                this.$cloudinary
                    .upload(data, {
                        folder: "Nftsoul/mint-profile",
                        uploadPreset: "famafihn",
                    })
                    .then((response) => {
                        this.member.avatar[this.avatarIndex] = response.secure_url
                        this.uploadavatar[this.avatarIndex] = false;
                        this.$forceUpdate()
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
            reader.readAsDataURL(file)

        },
        async onImageUpload(e) {

            for (var x = 0; x < e.target.files.length; x++) {
                this.uploading = true
                var file = e.target.files[x];

                const readData = (f) =>
                    new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.readAsDataURL(f);
                    });

                /* Read data */
                const data = await readData(file);

                /* upload the converted data */
                const instance = this.$cloudinary
                    .upload(data, {
                        folder: "Nftsoul/mint-showcase",
                        uploadPreset: "famafihn",
                    })
                    .then((response) => {
                        this.uploading = false;
                        this.files.push(response.secure_url)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }

            // }
        }
    }
}
</script>

<style scoped>
/* .img-slot {
    width: 75px;
    height: 75px;
    border: 1px solid white;
    border-style: dashed;
}

.slick-track {
    width: 100% !important;
    width: 600px !important;
}

.slick-slide,
.slick-active,
.slick-current {
    width: 100% !important;
    width: 600px !important;
} */


.flex-item {
    flex: 1 1 100%;
    max-width: 160px;
}
</style>
