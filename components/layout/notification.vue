<template>
<div>
    <v-menu transition="slide-y-transition" bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
            <div class="mx-4">
                <v-badge color="green" content="6" overlap>
                    <v-icon dark v-bind="attrs" v-on="on" size="28" class="mx-2 mt-1">mdi-bell</v-icon>
                </v-badge>
            </div>
        </template>

        <v-card width="400" class="mx-auto pt-2" dark color="primary">
            <v-row justify="space-between" class="pb-2 pt-3 px-5">
                <v-btn text small class="text-capitalize">See All</v-btn>
                <p class="text-center body-1 font-weight-bold">Notifications</p>
                <v-btn text small class="text-capitalize" @click="markAllAsRead()">Mark all as read</v-btn>
            </v-row>
            <!-- <v-divider></v-divider>
        <v-virtual-scroll v-if="notifications.length>0" :items="notifications" :item-height="58" height="400" class="hidden-scroll">
            <template v-slot="{item}">
                <v-list dense class="py-0">
                    <v-hover v-slot="{ hover }">
                        <div class="list-border">
                            <v-card class="list-border" :color="getColor(item)" flat tile>
                                <v-list-item :key="item.id" color="background" dense link @click="goToLink(item)">
                                    <v-list-item-avatar>
                                        <v-divider></v-divider>
                                        <v-img v-if="item.user.profile" :src="item.user.profile"></v-img>
                                        <v-img v-else :src="require('~/assets/images/student-avatar.svg')"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <div class="comment-box">
                                            <p class="mb-0" style="font-size:12px" v-html="getDescription(item)"></p>
                                        </div>
                                    </v-list-item-content>
                                    <v-list-item-action>
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
                                    </v-list-item-action>

                                </v-list-item>
                            </v-card>
                        </div>
                    </v-hover>
                </v-list>
            </template>
        </v-virtual-scroll>
        <v-container fluid v-else>
            <v-row>
                <v-col cols="12" align="center">
                    <div v-if="dataEnd ==false" v-intersect.quiet="{handler: onIntersect,options: {threshold: [0, 0.5, 1.0]}}" class="mb-2">
            <spinner :animation-duration="1000" :size="40" :color="'#3bac76'" />
                    </div>
                    <p v-if="dataEnd==true" class="text--disabled">No Notifications</p>
                </v-col>
            </v-row>
        </v-container> -->
        </v-card>
    </v-menu>

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
    computed:{
        walletAddress(){
          return this.$store.state.wallet.walletAddress
        }
    },
    mounted() {
        this.getNotifications()
    },
    methods: {
        getNotifications() {
            this.page += 1
            this.$axios.get('/nofitications', {
                    params: {
                        page:this.page,
                        limit:8,
                        id: this.walletAddress
                    },
                })
                .then(res => {
                    console.log('npt:',res.data)
                    this.total = res.data.total
                    if (this.page == 1) {
                        this.notifications = res.data.data
                    } else {
                        if (res.data.data.length > 0) {
                            for (var x = 0; x < res.data.data.length; x++) {
                                this.notifications.push(res.data.data[x])
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
            let desc;
            switch (item.notification_type.type) {
                //community
                case 'Post Applaud':
                    desc = "<b>" + item.user.name + "</b> admired your <b>post</b>.";
                    break;

                case 'Post Comment Owner':
                    //aafno post ma comment vaeko notification
                    desc = "<b>" + item.user.name + "</b> commented on your <b>post</b>.";
                    break;

                case 'Post Comment Commentator':
                    //maile kunai post ma comment gare. tyo post ma post ma post owner le comment gareko notification
                    if (item.sender_id == item.post_owner_id) {
                        desc = "<b>" + item.user.name + "</b> also commented on his <b>post</b>.";
                    } else {
                        //maile kunai post ma comment gare. tyo post ma post ma aru le comment gareko notification
                        desc = "<b>" + item.user.name + "</b> also commented on <b>" + item.post_owner.name + "</b>'s <b>post</b>.";
                    }
                    break;

                case 'Post Repost':
                    desc = "<b>" + item.user.name + "</b> reposted your <b>post</b>.";
                    break;

                case 'Post Shared':
                    desc = "<b>" + item.user.name + "</b> shared your <b>post</b>";
                    break;

                case 'Comment Replied Post Owner':
                    //aafno comment ma aruko reply
                    if (item.comment_owner.id == this.$auth.user.id) {
                        desc = "<b>" + item.user.name + "</b> replied to your comment on your <b>post</b>.";
                    } else {
                        //aruko comment ma aruko reply
                        desc = "<b>" + item.user.name + "</b> replied to a comment on your <b>post</b>."
                    }
                    console.log('comment:', item)
                    break;

                case 'Comment Replied Commentator':
                    //aruko post ma aafno comment ko reply
                    if (item.sender_id == item.post_owner.id) {
                        desc = "<b>" + item.user.name + "</b> replied to your comment on his <b>post</b>.";
                    } else {
                        desc = "<b>" + item.user.name + "</b> replied to your comment on " + item.post_owner.name + "'s <b>post</b>.";
                    }
                    break;

                case 'Comment Replied Repliers':
                    if (item.sender_id == item.post_owner.id) {
                        if (item.sender_id == item.comment_owner.id) {
                            desc = "<b>" + item.user.name + "</b> also replied to his own comment on his <p>post</p>.";
                        } else {
                            if (item.comment_owner.id == this.user.id) {
                                desc = "<b>" + item.user.name + "</b> also replied to your comment on his <b>post</b>.";
                            } else {
                                desc = "<b>" + item.user.name + "</b> also replied to <b>" + item.comment_owner.id + "</b>'s comment on his <b>post</b>.";
                            }

                        }

                    } else {
                        if (item.sender_id == item.comment_owner.id) {
                            desc = "<b>" + item.user.name + "</b> also replied to his own comment on <b>" + item.post_owner.name + "</b>'s <b>post</b>";
                        } else {
                            if (item.comment_owner.id == this.user.id) {
                                desc = "<b>" + item.user.name + "</b> also replied to your comment on <b>" + item.post_owner.name + "</b>'s <b>post</b>";

                            } else {
                                desc = "<b>" + item.user.name + "</b> also replied to <b>" + item.comment_owner.name + "</b>'s comment on <b>" + item.post_owner.name + "</b>'s post";
                            }
                        }
                    }
                    break;

                    // Classroom notification
                case 'Class Post Tutor':
                    desc = "<b>" + item.user.name + "</b> posted in your class:<b> " + item.classroom.title + "</b>";
                    break;
                case 'Class Post Member':
                    if (item.user.role_id == 3) {
                        desc = "<b>" + item.user.name + "</b> also posted in your class:<b> " + item.classroom.title + "</b>";
                    } else {
                        desc = "<b>" + item.user.name + "</b> Sir posted in your class:<b> " + item.classroom.title + "</b>";
                    }
                    break;
                case 'Live Class':
                    desc = "Your class" + item.classroom.title + " is now live";
                    break;
                case 'Kicked From Class':
                    desc = "You have been kicked out from class: <b>" + item.class.title + "</b>.";
                    break;
                case 'Left Class':
                    desc = '<b>' + item.user.name + '</b> left your class: <b>' + item.class.title + '</b>.'
                    break;
                    //Q & A
                case 'Question Answered':
                    desc = "<b>" + item.user.name + "</b> answered to your <b>question</b>.";
                    break;

                case 'Answer Upvoted':
                    desc = "Your answer to <b>" + item.user.name + "'s</b> question is <b>upvoted.</b>";
                    break;

                case 'Answer Downvoted':
                    desc = "Your answer to <b>" + item.user.name + "'s</b> question is <b>downvoted.</b>";
                    break;

                case 'Answer Call':
                    desc = "<b>" + item.user.name + "</b> called you to answer a <b>question</b>.";
                    break;

                case 'Answer Notified':
                    if (item.sender_id == this.user.id) {
                        desc = "You posted an answer to a question you didn't know before."
                    } else {
                        desc = "<b>" + item.user.name + "</b> posted an answer to a question you want to know.";
                    }
                    break;

                    //Requests
                case 'Mate Accepted':
                    desc = "<b>" + item.user.name + "</b> accepted your mate request.";
                    break;

                case 'Tutor Followed':
                    desc = "<b>" + item.user.name + "</b> followed you.";
                    break;

                case 'Student Accepted':
                    desc = "<b>" + item.user.name + "</b> accepted you as his student.";
                    break;

                    // group notifications
                case 'Added To Group':
                    desc = "<b>" + item.user.name + "</b> added you to the group: <b>" + item.group.title + "</b>";
                    break;

                case 'Group Post':
                    desc = "<b>" + item.user.name + "</b> posted in your group: <b>" + item.group.title + "</b>";
                    break;

                case 'Kicked From Group':
                    desc = "You have been kicked out from group: <b>" + item.group.title + "</b>.";
                    break;

                    //course
                case 'Subscription End':
                    desc = 'You subscription to a course:<b>' + item.course.title + '</b> will end in <b>' + item.days + '</b> days.'

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
</style>
