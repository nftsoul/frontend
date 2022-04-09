import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios';

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'https://localhost:3001', // Your API domain
  
  providers: {
    twitter: {
        clientId: '',
        redirectUri: 'https://localhost:3001/profile' // Your client app URL
      }
  }
})