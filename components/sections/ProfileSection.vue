<template>
    <div>
        <EventButton EventButtonText="Edit Profile" />
        <UpdateProfile />
    </div>
</template>

<script>
import EventButton from "../basics/EventButton.vue";
import UpdateProfile from "./UpdateProfile.vue";
export default {
    components: { EventButton, UpdateProfile }
}
</script>

<style scoped>
</style>