<template>
<div class="dark-bg pt-10">
    <div class="f-shadow">

        <v-container class="py-10">
            <v-row class="py-10">
                <v-col cols="12" lg="3" md="6" sm="4" class="footer">
                    <h5 class="mb-5">Nft Soul</h5>
                    <small>Introducing a new utility for NFTs. Exhibit, Interact and Earn via NFTs. </small>
                </v-col>
                <v-col cols="12" lg="3" md="6" sm="4" class="footer">
                    <h5 class="mb-5">Nft Soul DAO</h5>
                    <p v-for="(item,i) in dao" :key="i" @click="goTo(item)">{{item.title}}</p>
                </v-col>
                <v-col cols="12" lg="3" md="6" sm="4" class="footer">
                    <h5 class="mb-5">Community</h5>
                    <p v-for="(item,i) in community" :key="i" @click="goTo(item)">{{item.title}}</p>
                </v-col>
                <v-col cols="12" lg="3" md="6" sm="4" class="footer">
                    <h5 class="mb-5">Join Our Discord</h5>
                    <small>Become a part of our community</small><br>
                    <v-icon class="mx-auto" large @click="goTo({link:'https://discord.com/invite/xcTuWYc8rj'})">mdi-discord</v-icon>
                </v-col>
            </v-row>

        </v-container>
        <v-divider></v-divider>
        <v-container>
            <v-row justify="center" class="py-2">
                <small>
                    <v-icon>mdi-copyright</v-icon>Copyright <span> {{ new Date().getFullYear() }}</span> - NFT Soul
                </small>
            </v-row>
        </v-container>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            valid: true,
            email: '',
            loading: false,
            validRules: {
                required: value => !!value || "Required.",
                length10: v => v && v.length == 10 || "Should be 10 characters",
            },
            dao: [
                // {
                //     title: 'About Us',
                //     link: ''
                // },
                {
                    title: 'Docs',
                    link: 'https://docs.nftsoul.io'
                },
                {
                    title: 'White Paper',
                    link: 'https://bit.ly/3lZbJiQ'
                },
                {
                    title: 'Medium',
                    link: 'https://medium.com/@nftsoul'
                }
            ],
            community:[
                {title:'Discord',link:'https://discord.com/invite/xcTuWYc8rj'},
                {title:'Twitter',link:'https://twitter.com/nftsoul_io'}
            ]
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
        },
        goTo(item) {
            window.open(item.link, "_blank");
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
    cursor: pointer;
}
.footer p:hover{
    color: #C202D3;
}
</style>
