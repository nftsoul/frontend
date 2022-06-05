<template>
<div>
    <v-card width="400" class="mx-auto pt-2" dark color="primary" min-height="400">
        <v-row justify="space-between" no-gutters class="px-2">
            <span>Your Notifications</span>
            <v-btn v-if="$route.name !='all-notifications'" @click="$router.push('/all-notifications')" text small class="text-capitalize">See All Activity</v-btn>
        </v-row>
        <v-row justify="space-between" no-gutters class="px-2" v-if="$route.name=='all-notifications'">
            <div>
                <v-tabs v-model="tab" background-color="transparent" tile color="purple" group height="30">
                    <v-tabs-slider color="#000229"></v-tabs-slider>
                    <v-tab class="text-capitalize" @click="tab=0">
                        All
                    </v-tab>
                    <v-tab class="text-capitalize" @click="tab=1">
                        Unread
                    </v-tab>
                </v-tabs>
            </div>
            <v-btn text small class="text-capitalize" @click="markAllAsRead()">Mark all as read</v-btn>
        </v-row>
        <v-divider class="mt-2"></v-divider>
        <v-virtual-scroll v-if="notifications.length>0" :items="notifications" :item-height="58" height="400" style="overflow:auto">
            <template v-slot="{item}">
                <v-list dense class="py-0">
                    <v-hover v-slot="{ hover }">
                        <div>
                            <v-card :color="getColor(item)" flat tile>
                                <v-list-item :key="item.id" color="background" style="box-shadow:none" dense link @click="goToLink(item)">
                                    <v-list-item-avatar>
                                        <v-divider></v-divider>
                                        <v-img v-if="item.from.image_link" :src="item.from.image_link" :lazy-src="item.from.image_link"></v-img>
                                        <v-icon v-else large>mdi-account</v-icon>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <div class="comment-box">
                                            <p class="mb-0 mt-2" style="font-size:12px" v-html="getDescription(item)"></p>
                                        </div>
                                    </v-list-item-content>
                                    <!-- <v-list-item-action>
                                        <v-list-item-action-text>
                                            <span v-if="!hover">{{ moment.utc(item.created_at).fromNow() }}</span>
                                            <v-tooltip top v-if="hover">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn icon x-small v-bind="attrs" v-on="on" @click="deleteNotification(item)">
                                                        <v-icon color="icon">mdi-delete</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span class="caption">Remove</span>
                                            </v-tooltip>
                                        </v-list-item-action-text>
                                    </v-list-item-action> -->
                                </v-list-item>
                                <v-row no-gutters justify="center" v-if="notifications.length>7 && notifications.length<total">
                                    <v-btn text @click="getNotifications()" :loading="more">Load More</v-btn>
                                </v-row>
                            </v-card>
                        </div>
                    </v-hover>
                </v-list>
            </template>
        </v-virtual-scroll>
        <v-container fluid v-else>
            <v-row>
                <v-col cols="12" align="center" v-intersect.quiet="{handler: onIntersect,options: {threshold: [0, 0.5, 1.0]}}">
                    <div v-if="dataEnd ==false" class="mb-2">
                        <v-skeleton-loader v-for="i in 8" :key="i" class="mt-2" dark type="list-item-avatar"></v-skeleton-loader>
                    </div>
                    <p v-if="dataEnd==true" class="text--disabled">No Notifications</p>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</div>
</template>

<script>
var moment = require("moment");
export default {
    data() {
        return {
            moment: moment,
            notifications: [],
            isIntersecting: false,
            dataEnd: false,
            page: 0,
            total: 0,
            mates: [],
            more: false,
            tab: 0,
            limit: 8
        }
    },
    watch: {
        tab(newValue, oldValue) {
            console.log(newValue)
            this.notifications = []
            this.dataEnd = false
            if (newValue == 1) {
                this.page = 0
            } else {
                this.page = 0
                this.limit = 16
            }
            this.getNotifications()
        }
    },
    computed: {
        walletAddress() {
            return this.$store.state.wallet.walletAddress
        },
        profile() {
            return this.$store.state.wallet.profile
        }
    },
    mounted() {
        this.getNotifications()
    },
    methods: {
        getNotifications() {
            this.page += 1
            this.more = true
            this.$axios.get('/nofitications', {
                    params: {
                        page: this.page,
                        limit: this.limit,
                        id: this.profile._id
                    },
                })
                .then(res => {
                    this.more = false
                    this.dataEnd = true
                    this.total = res.data.total_notifications
                    for (var x = 0; x < res.data.notifications.length; x++) {
                        if (this.tab == 0) {
                            this.notifications.push(res.data.notifications[x])
                        } else {
                            if (res.data.notifications[x].seen == false) {
                                this.notifications.push(res.data.notifications[x])
                            }
                        }
                    }

                })
                .catch(err => console.log(err.response))
        },
        onIntersect(entries, observer, isIntersecting) {
            this.getNotifications()
        },
        getDescription(item) {
            let desc, user;
            if (item.from.name) {
                user = item.from.name
            } else {
                user = item.from.wallet_address.slice(0, 8)
            }
            switch (item.type) {
                case 'commented':

                    desc = "<b>" + user + "</b> commented on your gallery.";
                    break;

                case 'replied':
                    desc = "<b>" + user + "</b> replied to your comment on a gallery.";
                    break;

                case 'fav_added':
                    desc = "<b>" + user + "</b> added your gallery as favorite.";
                    break;

            }
            return desc;
        },
        goToLink(item) {
            if (item.seen == false) {
                this.readNotification(item)
            }

            switch (item.type) {
                case 'commented':
                case 'replied':
                    this.$router.push({
                        name: 'preview-id',
                        params: {
                            id: item.data.gallery_id
                        }
                    })
                    break;

                case 'fav_added':
                    this.$router.push('/profile/' + this.walletAddress + '/gallery')
                    break;

            }
        },
        getColor(item) {
            if (item.seen == true) {
                return 'background'
            } else {
                return 'notification'
            }
        },
        deleteNotification(item) {
            this.notifications.splice(this.notifications.indexOf(item), 1)
            if (this.notifications.length == 0) {
                this.dataEnd = true
            }
            this.$axios.post(process.env.baseUrl + '/deleteNotification', {
                notify_id: item.id
            }, this.config).catch(err => console.log(err.response))
        },
        readNotification(item) {
            const index = this.notifications.indexOf(item)
            this.notifications[index].seen = true
            this.$axios.get('/notification/' + item._id)
                .catch(err => console.log(err.response))
        },
        markAllAsRead() {
            for (var x = 0; x < this.notifications.length; x++) {
                if (this.notifications[x].seen == false) {
                    this.notifications[x].seen = true
                }

            }
            this.$axios.patch('notification/mark-all-read', {
                    id: this.profile._id
                })
                .catch(err => console.log(err.response))
        }
    }
}
</script>

<style scoped>
.list-border {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.comment-box {
    width: 100%;
    height: 30px;
    overflow: hidden;
}

div.v-skeleton-loader__list-item-avatar.v-skeleton-loader__bone {
    background: #1b024d;
}

.v-tav--active {
    background-color: transparent !important;
    color: white !important;
}
</style>
