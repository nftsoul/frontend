<template>
    <div>
        <v-card width="400px" color="#000229" class="mx-a ml-2 br-3">
            <v-card-title>Update Profile</v-card-title>
            <v-form class="px-6">
                <v-text-field class="px-3" label="Enter Your Full name" outlined />
                <v-text-field class="px-3" label="Pick a username" outlined />
            </v-form>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="update-btn px-4">Update</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.update-btn {
    border: 1px solid #fff;
    background: transparent !important;
    border-radius: 6px;
}
</style>