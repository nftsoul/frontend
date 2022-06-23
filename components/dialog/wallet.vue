<template>
<div>
    <v-dialog v-model="walletDialog" max-width="400" persistent>
        <div class="dark-bg">
            <v-card color="background" outlined>
                <p class="text-right">
                    <v-icon @click="$store.commit('wallet/setWalletDialog',false)">mdi-close</v-icon>
                </p>
                <p class="text-center">Choose your wallet to continue</p>
                <v-list-item dense v-for="(item,i) in wallets" :key="i">
                    <v-list-item-avatar size="30">
                        <v-img :src="require('~/assets/images/'+item.icon)"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>{{item.title}}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                        {{item.status}}
                    </v-list-item-action>
                </v-list-item>
            </v-card>
        </div>
    </v-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            wallets: [{
                    icon: 'phantom.png',
                    title: 'Phantom',
                    status: null
                },
                {
                    icon: 'metamask.jpg',
                    title: 'Metamask',
                    status: null
                }
            ]
        }
    },
    computed: {
        walletDialog: {
            get() {
                return this.$store.state.wallet.walletDialog
            },
            set(value) {
                this.$store.commit('wallet/setWalletDialog', value)
            }
        }
    }
}
</script>
