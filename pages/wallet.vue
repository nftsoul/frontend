<template>
<div class="dark-bg">
    <v-container class="py-16">
        <v-row justify="center" class="pt-16">
            <v-col cols="12" lg="8" md="10" align="center">
            <h2 class="mb-3">Connect Your Wallet</h2>
            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Sapien pellentesque habitant morbi tristique senectus et netus et. </small>
        </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" lg="3" md="6" v-for="(item,i) in wallet" :key="i">
                <v-card color="primary" max-width="300" class="pa-5">
                    <v-img :src="require('~/assets/images/wallet/'+item.src)" max-width="50" class="mx-auto mb-3"></v-img>
                    <p class="font-weight-bold text-center">{{item.title}}</p>
                    <p class="text-center" style="font-size:12px">{{item.text}}</p>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</div>
</template>
<script>
export default {
    data(){
        return{
            wallet:[
                {src:'metamask.png',title:'Metamask',text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'},
                {src:'fortmatic.png',title:'Fortmatic',text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'},
                {src:'Coinbase Wallet.png',title:'Coinbase wallet',text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'},
                {src:'fortmatic.png',title:'Torus',text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'},
                {src:'WalletConnect.png',title:'Wallet Connect',text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'},
                {src:'Bitski.png',title:'Bitski',text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'},
                {src:'Authereum.png',title:'Authereum',text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'},
                {src:'kaikas.png',title:'Kaikas',text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'}
            ]
        }
    }
}
</script>
