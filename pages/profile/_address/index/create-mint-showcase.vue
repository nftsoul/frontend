<template>
<div class="dark-bg pt-16">
    <v-container class="mt-8">
        <v-row justify="center">
            <v-col cols="12" lg="6" md="8">
                <h2 class="gradient-title text-center mb-5">Create Mint Showcase</h2>

                <v-form ref="form" v-model="valid">
                    <label for="">Collection Name</label>
                    <FormCustomTextField v-model="name" :rules="[validRules.required,validRules.lengthMin3]" />

                    <label for="">Collection description</label>
                    <FormCustomTextArea v-model="description" :rules="[validRules.required,validRules.lengthMax200]" />

                    <label for="">Roadmap</label>
                    <div v-for="(item,i) in roadmap" :key="i">
                        <p>Phase {{i+1}}</p>
                        <FormCustomTextArea v-model="road.phases[i]" :rules="[validRules.required,validRules.lengthMax200]" />
                    </div>
                    <v-btn color="#A0A0A0" dark class="mb-8" @click="roadmap +=1">
                        <v-icon>mdi-plus</v-icon>
                        Add More Phase
                    </v-btn>
                    <br>

                    <label for="">About Team</label>
                    <FormCustomTextArea v-model="about_team" :rules="[validRules.required,validRules.lengthMax200,validRules.lengthMin3]" />

                    <v-row>
                        <v-col cols="6" v-for="i in team" :key="i">
                            <p>Member {{i}}</p>
                            <label>Name</label>
                            <FormCustomTextField v-model="member.name[i]" :rules="[validRules.required,validRules.lengthMin3]" />
                            <label>Role</label>
                            <FormCustomTextField v-model="member.role[i]" :rules="[validRules.required,validRules.lengthMin3]" />
                            <label>Social Link</label>
                            <FormCustomTextField v-model="member.social_link[i]" :rules="[validRules.required,validRules.lengthMin3]" />
                        </v-col>
                    </v-row>

                    <v-btn color="#A0A0A0" dark class="mb-8" @click="team +=1">
                        <v-icon>mdi-plus</v-icon>
                        Add Member
                    </v-btn>
                    <br>

                    <label for="">Twitter Link</label>
                    <FormCustomTextField v-model="twitter" :rules="[validRules.required,validRules.lengthMin3]" />

                    <label for="">Discord Link</label>
                    <FormCustomTextField v-model="discord" :rules="[validRules.required,validRules.lengthMin3]" />

                    <label for="">Linkedin Profile</label>
                    <FormCustomTextField v-model="linkedin" :rules="[validRules.required,validRules.lengthMin3]" />

                    <label for="">Email Address</label>
                    <FormCustomTextField v-model="email" :rules="[validRules.required,validRules.validEmail]" />

                    <v-row justify="center">
                        <v-col cols="12" lg="6" md="6">
                            <label for="">Mint Date</label>
                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="date" placeholder="YYY-MM-DD" dense outlined readonly v-bind="attrs" v-on="on" :rules="[validRules.required]"></v-text-field>
                                </template>
                                <v-date-picker light v-model="date" :active-picker.sync="activePicker" max="2030-01-01" min="2020-01-01" @change="save"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" lg="6" md="6">
                            <label for="" placeholder="eg: 0.02 sol">Mint Price</label>
                            <FormCustomTextField v-model="mintPrice" inputtype="number" :rules="[validRules.required,validRules.positive]" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" align="center">
                            <div>
                                <p>Upload File</p>
                                <div style="border:1px solid #FE87FF" class="py-16">
                                    <div @click="selectImage" class="link" v-if="files.length==0">
                                        <v-icon color="#FE87FF" size="75">
                                            mdi-image
                                        </v-icon>
                                        <v-btn text :loading="uploading">Browse Files</v-btn>
                                    </div>
                                    <client-only>
                                        <VueSlickCarousel v-if="files.length>0" v-bind="slickSetting">
                                            <div v-for="(item, i) in files" :key="i">
                                                <v-img :src="item" class="rounded-lg white-border mx-2" max-width="300">
                                                </v-img>
                                                <v-icon @click="removeFile(item)">mdi-close</v-icon>
                                            </div>
                                        </VueSlickCarousel>
                                    </client-only>
                                    <v-btn dark color="#FE87FF" :loading="uploading" @click="selectImage" v-if="files.length >0 && files.length<11" class="mt-5">
                                        <v-icon>
                                            mdi-image-plus
                                        </v-icon>
                                        Upload More
                                    </v-btn><br>
                                    <small style="color:red" v-if="files.length>0 && files.length<11">11 nfts required to showcase.</small>
                                    <input ref="imageUploader" multiple class="d-none" type="file" accept="image/png,image/jpg,image/jpeg" @change="onImageUpload" />
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

<script>
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
                social_link: []
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
            },
            uploading: false,
            activePicker: null,
            date: null,
            menu: false,
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
                if (this.files.length < 11) {
                    this.$toast
                        .error("You must select 11 nfts.", {
                            iconPack: "mdi",
                            icon: "mdi-image",
                            theme: "outline",
                        })
                        .goAway(3000);
                } else {

                    //arranging team data
                    this.saving = true
                    let meminfo = []
                    for (var x = 0; x < this.team; x++) {
                        meminfo.push({
                            'name': this.member.name[x],
                            'role': this.member.role[x],
                            'social_link': this.member.social_link[x]
                        })
                    }
                    this.$axios.post('/mint/create', {
                            collection_name: this.name,
                            description: this.description,
                            roadmap: this.road.phases,
                            about_team: this.about_team,
                            members: meminfo,
                            social: {
                                'twitter': this.twitter,
                                'discord': this.discord,
                                'linkedin': this.linkedin
                            },
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
            }
        },
        selectImage() {
            this.$refs.imageUploader.click();
        },
        removeFile(item) {
            this.files.splice(this.files.indexOf(item), 1)
        },
        save(date) {
            this.$refs.menu.save(date)
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

        }
    }
}
</script>
