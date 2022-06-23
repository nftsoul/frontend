<template>
<div>
    <span v-if="false"></span>
</div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: 'https://res.cloudinary.com/doxa4k3b0/image/upload/v1655883374/Nftsoul/logo_ljmkk8.svg'
        }
    },

    head() {
        return {
            meta: [{
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.title
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.description
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: this.image
                },
                {
                    hid: 'twitter:image:alt',
                    name: 'twitter:image:alt',
                    content: this.title
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: this.title
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: this.description
                },
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: this.image
                },
                {
                    hid: 'og:image:secure_url',
                    property: 'og:image:secure_url',
                    content: this.image
                },
                {
                    hid: 'og:image:alt',
                    property: 'og:image:alt',
                    content: this.title
                }
            ]
        }
    },
    mounted(){
        console.log(this.title)
        console.log(this.description)
        console.log(this.image)
    }
}
</script>
