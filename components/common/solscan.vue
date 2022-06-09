<template>
<div>
    <v-snackbar :timeout="timeout" v-model="snackbar" right bottom color="primary" elevation="24">
        <v-row class="py-2">
            <p class="mb-0 mr-2">
                <v-icon>mdi-check</v-icon>Transaction recorded.
            </p>
            <v-btn small color="#C202D3" @click="viewSolscan()" class="mt-n1"><small>View on Solscan</small></v-btn>
        </v-row>
    </v-snackbar>
</div>
</template>

<script>
export default {
    data() {
        return {
            timeout: 5000,
        }
    },
    computed: {
        snackbar: {
            get() {
                return this.$store.state.wallet.snackbar
            },
            set(value) {
                this.$store.commit('wallet/setSnackbar', value)
            }
        },
        signature(){
            return this.$store.state.wallet.signature
        }
    },
    methods: {
        viewSolscan() {
            window.open('https://solscan.io/tx/'+this.signature+'?cluster='+process.env.CLUSTER, "_blank");
        }
    }
}
</script>

<style>
.v-snack__content {
    border: 2px solid white;
    border-radius: 5px;
}
</style>
