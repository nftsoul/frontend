export const state = () => ({
  
})

export const mutations = {
 

}
export const actions={
    async searchGallery(context,payload){
        let search=await this.$axios.get('/gallery/search',{
            params:payload
        })
        return search.data.data;

    }
}