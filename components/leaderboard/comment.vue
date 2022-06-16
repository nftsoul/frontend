<template>
<div>
    <v-container>
        <v-row class="py-3">
            <p class="title2">Top Recent Comments</p>
            <v-list-item dense v-for="(item,i) in 4" :key="i">
                <v-list-item-avatar class="mr-1">
                    <v-icon>mdi-account</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                        <p class="mb-1 mt-2" style="font-size:12px">Marcio Bordin</p>
                        <p class="mb-0 text--disabled" style="font-size:12px">Commented on DegenApe academy</p>
                </v-list-item-content>
            </v-list-item>
        </v-row>
    </v-container>
</div>
</template>
