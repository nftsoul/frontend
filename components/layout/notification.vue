<template>
<div>
    <v-card width="400" class="mx-auto pt-2" dark color="primary">
        <v-row justify="space-between" no-gutters>
            <v-btn text small class="text-capitalize">Your Notification</v-btn>
            <v-btn text small class="text-capitalize" @click="markAllAsRead()">Mark all as read</v-btn>
        </v-row>
        <v-divider class="mt-2"></v-divider>
        <v-virtual-scroll v-if="notifications.length>0" :items="notifications" :item-height="58" height="400" class="hidden-scroll">
            <template v-slot="{item}">
                <v-list dense class="py-0">
                    <v-hover v-slot="{ hover }">
                        <div>
                            <v-card :color="getColor(item)" flat tile>
                                <v-list-item :key="item.id" color="background" dense link @click="goToLink(item)">
                                    <v-list-item-avatar>
                                        <v-divider></v-divider>
                                        <v-img v-if="item.from.image_link" :src="item.from.image_link" :lazy-src="item.from.image_link"></v-img>
                                        <v-icon v-else large>mdi-account</v-icon>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <div class="comment-box">
                                            <p class="mb-0" style="font-size:12px" v-html="getDescription(item)"></p>
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
                            </v-card>
                        </div>
                    </v-hover>
                </v-list>
            </template>
        </v-virtual-scroll>
        <v-container fluid v-else >
            <v-row>
                <v-col cols="12" align="center" v-intersect.quiet="{handler: onIntersect,options: {threshold: [0, 0.5, 1.0]}}">
                    <div v-if="dataEnd ==false"  class="mb-2">
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
        // this.getNotifications()
    },
    methods: {
        getNotifications() {
            this.page += 1
            this.$axios.get('/nofitications', {
                    params: {
                        page: this.page,
                        limit: 8,
                        id: '627a155d4655603baaa513e6'
                    },
                })
                .then(res => {
                    console.log('npt:', res.data)
                    this.total = res.data.total_notifications
                    if (this.page == 1) {
                        this.notifications = res.data.notifications
                    } else {
                        if (res.data.notifications.length > 0) {
                            for (var x = 0; x < res.data.notifications.length; x++) {
                                this.notifications.push(res.data.notifications[x])
                            }
                        }
                        if (this.notifications.length == 0) {
                            this.dataEnd = true
                        }
                    }

                })
                .catch(err => console.log(err.response))
        },
        onIntersect(entries, observer, isIntersecting) {
            this.getNotifications()
        },
        getDescription(item) {
            console.log('notify:',item)
            let desc;
            switch (item.type) {
                case 'commented':
                    desc = 'commented'+ "</b> admired your <b>post</b>.";
                    break;

                case 'replied':
                    desc = "<b>" + item.from.name + "</b> commented on your <b>post</b>.";
                    break;

                case 'fav_added':
                    desc = 'commented'+ "</b> admired your <b>post</b>.";
                    break;

            }
            return desc;
        },
        goToLink(item) {
            this.$store.commit('general/setCloseClick')
            let data = JSON.parse(item.data);
            // console.log('notification item:',item)
            if (!item.read_at) {
                this.readNotification(item)
            }

            switch (item.notification_type.type) {
                //community
                case 'Post Applaud':
                case 'Post Repost':
                    this.$router.push({
                        name: 'st-post-id',
                        params: {
                            id: data.post_id
                        }
                    })
                    break;

                case 'Post Comment Commentator':
                case 'Post Comment Owner':
                    this.$store.commit('community/setNotifyCommentId', item)
                    this.$router.push({
                        name: 'st-post-id',
                        params: {
                            id: data.post_id
                        }
                    })
                    break;

                case 'Comment Replied Post Owner':
                case 'Comment Replied Commentator':
                case 'Comment Replied Repliers':
                    this.$store.commit('community/setNotifyReplyId', item)
                    this.$router.push({
                        name: 'st-post-id',
                        params: {
                            id: data.post_id
                        }
                    })
                    break;
                case 'Class Post Tutor':
                case 'Class Post Member':
                    if (this.user.role.role == 'Tutor') {
                        this.$router.push({
                            name: 'st-classroom-class_id-class_title',
                            params: {
                                class_id: item.classroom.id,
                                class_title: item.classroom.title
                            }
                        })
                    } else if (this.user.role.role == 'Students') {
                        this.$router.push({
                            name: 'st-classroom-class_id-class_title',
                            params: {
                                class_id: item.classroom.id,
                                class_title: item.classroom.title
                            }
                        })
                    }

                    break;
                case 'Kicked From Class':
                    this.$router.push({
                        name: 'st-classroom'
                    })
                    break;
                case 'Live Class':
                    desc = "";
                    break;
                case 'Left Class':
                    this.$router.push({
                        name: 'st-classroom-class_id-class_title',
                        params: {
                            class_id: item.class.id,
                            class_title: item.class.title
                        }
                    })
                    break;
                case 'News Posted':
                    desc = "";
                    break;

                    //student
                case 'Question Answered':
                    this.$router.push({
                        name: 'st-qna-post_id',
                        params: {
                            post_id: data.post_id
                        }
                    })
                    break;
                case 'Answer Upvoted':
                case 'Answer Downvoted':
                    this.$store.commit('qna/setNotifyAnswerId', item)
                    this.$router.push({
                        name: 'st-qna-post_id',
                        params: {
                            post_id: data.post_id
                        }
                    })
                    break;

                case 'Answer Call':
                    this.$router.push({
                        name: 'st-qna-post_id',
                        params: {
                            post_id: data.question.id,
                            question: data.question.question_post.question
                        }
                    })
                    break;
                case 'Answer Notified':
                    this.$store.commit('communit/setNotifyAnswerId', item)
                    this.$router.push({
                        name: 'st-qna-post_id',
                        params: {
                            post_id: data.question.id,
                            question: data.question.question_post.question
                        }
                    })
                    break;
                case 'Mate Accepted':
                    this.$router.push({
                        name: 'st-id',
                        params: {
                            id: data.user.id,
                            name: data.user.name
                        }
                    })
                    break;
                case 'Tutor Followed':
                    this.$router.push({
                        name: 'tt-follower',
                    })
                    break;
                case 'Student Accepted':
                    this.$router.push({
                        name: 'st-tutors-index'
                    })
                    break;

                case 'Added To Group':
                case 'Group Post':
                    this.$router.push({
                        name: 'st-group-id-group',
                        params: {
                            group_id: data.group.id,
                            group_title: data.group.title
                        }
                    })
                    break;

                case 'Kicked From Group':
                    this.$router.push({
                        name: 'st-group-id-group',
                        params: {
                            group_id: data.group.id,
                            group_title: data.group.title
                        }
                    })
                    break;
            }
        },
        getColor(item) {
            if (item.read_at) {
                return 'white'
            } else {
                return 'background'
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
            this.notifications[index].read_at = Date.now()
            this.$axios.post(process.env.baseUrl + '/readNotification', {
                    notify_id: item.id
                }, this.config)
                .catch(err => console.log(err.response))
        },
        markAllAsRead() {
            for (var x = 0; x < this.notifications.length; x++) {
                if (this.notifications[x].read_at == null) {
                    this.notifications[x].read_at = Date.now()
                }

            }
            this.$axios.get(process.env.baseUrl + '/markAllAsRead', this.config)
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
 div.v-skeleton-loader__list-item-avatar.v-skeleton-loader__bone{
     background:#5E0FFF;
 }
</style>
