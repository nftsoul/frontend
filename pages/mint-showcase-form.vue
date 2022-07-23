<template>
<div class="dark-bg mt-16">
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="6" md="8">
                <h3 class="text-center">Create Mint Showcase</h3>
                <label for="">Collection Name</label>
                <FormCustomTextField />

                <label for="">Collection description</label>
                <FormCustomTextField rows="3" :auto-grow='true' />

                <label for="">Roadmap</label>
                <FormCustomTextField rows="3" />

                <label for="">About Team</label>
                <FormCustomTextField />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="3">
                <p>Member 1</p>
                <label>Name</label>
                <FormCustomTextField />
                <label>Role</label>
                <FormCustomTextField />
                <label>Social Link</label>
                <FormCustomTextField />
            </v-col>
            <v-col cols="3">
                <p>Member 2</p>
                <label>Name</label>
                <FormCustomTextField />
                <label>Role</label>
                <FormCustomTextField />
                <label>Social Link</label>
                <FormCustomTextField />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="3">
                <p>Member 3</p>
                <label>Name</label>
                <FormCustomTextField />
                <label>Role</label>
                <FormCustomTextField />
                <label>Social Link</label>
                <FormCustomTextField />
            </v-col>
            <v-col cols="3">
                <p>Member 4</p>
                <label>Name</label>
                <FormCustomTextField />
                <label>Role</label>
                <FormCustomTextField />
                <label>Social Link</label>
                <FormCustomTextField />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" lg="6">
                <v-btn color="#A0A0A0" dark class="mb-8">
                    <v-icon>mdi-plus</v-icon>
                    Add Member
                </v-btn>
                <br>
                <label for="">Twitter Link</label>
                <FormCustomTextField />
                <label for="">Discord Link</label>
                <FormCustomTextField />
                <label for="">Linkedin Profile</label>
                <FormCustomTextField />
                <label for="">Email Address</label>
                <FormCustomTextField />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" lg="3" md="3">
                <label for="">Mint Date</label>
                <FormCustomTextField placeholder="MM/DD/YYYY" />
            </v-col>
            <v-col cols="12" lg="3" md="3">
                <label for="" placeholder="eg: 0.02 sol">Mint Price</label>
                <FormCustomTextField />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" lg="5" md="5" align="center">
                <p>Upload File</p>
                <div style="border:1px solid #FE87FF" class="py-16">
                    <v-icon color="#FE87FF" size="75">
                        mdi-image
                    </v-icon>
                    <p>Browse Files</p>
                </div>
                <v-btn class="btn-exhibit mt-3">Submit</v-btn>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>
