<template>
<div class="dark-bg pt-10">
    <div class="f-shadow">

        <v-container class="py-10">
            <v-row class="py-10">
                <v-col cols="12" lg="3" md="6" sm="4" class="footer">
                    <h5 class="mb-5">Marketplace</h5>
                    <p>All NFTs</p>
                    <p>Art</p>
                    <p>Music</p>
                    <p>Domain Names</p>
                    <p>Virtual World</p>
                    <p>Collectibles</p>
                </v-col>
                <v-col cols="12" lg="3" md="6" sm="4" class="footer">
                    <h5 class="mb-5">Resources</h5>
                    <p>Help Center</p>
                    <p>Partners</p>
                    <p>Suggestions</p>
                    <p>Discord</p>
                    <p>Docs</p>
                    <p>Newsletter</p>
                </v-col>
                <v-col cols="12" lg="3" md="6" sm="4" class="footer">
                    <h5 class="mb-5">Community</h5>
                    <p>Community</p>
                    <p>Documentation</p>
                    <p>BraND Access</p>
                    <p>Blog</p>
                    <p>Forum</p>
                    <p>Mailing List</p>
                </v-col>
                <v-col cols="12" lg="3" md="6" sm="4" class="footer">
                    <h5 class="mb-5">Newsletter</h5>
                    <p>Signup for our newsletter to get the latest news in your inbox.</p>
                    <v-form v-model="valid" ref="form">
                        <v-text-field prepend-inner-icon="mdi-mail" append-icon="mdi-arrow-right" placeholder="Enter your email"></v-text-field>

                    </v-form>
                    <p>Your email is safe with us. We don't spam.</p>
                </v-col>
            </v-row>

        </v-container>
        <v-divider></v-divider>
        <v-container>
            <v-row class="py-2">
                <small>
                    <v-icon>mdi-copyright</v-icon>Copyright 2021 - NFT Soul
                </small>
            </v-row>
        </v-container>
    </div>
</div>
</template>

<script>
export default {
    datae() {
        return {
            valid: true,
            email: '',
            loading: false,
            validRules: {
                required: value => !!value || "Required.",
                length10: v => v && v.length == 10 || "Should be 10 characters",
            },
        }
    },
    methods: {
        recordMail() {
            if (this.$refs.form.validate()) {
                this.loading = true
                axios.post('https://nft-soul.herokuapp.com/api/subscribe', {
                    email: this.email
                }).then(res => {
                    this.$toast
                        .error("Thanks for subscribing our newsletter.", {
                            iconPack: "mdi",
                            icon: "mdi-newspaper",
                            theme: "outline"
                        })
                        .goAway(3000);
                }).catch(err => console.log(err.response))
            }
        }
    }
}
</script>

<style lang="css">
.f-shadow {
    box-shadow: 0px 0px 10px #C202D3;
}

.footer h5 {
    font-weight: 500;
    font-size: 16px;

}

.footer {
    color: #F5F7F8;
}

.footer p {
    font-weight: normal;
    font-size: 14px;
}
</style>
