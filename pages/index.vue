<template>
<div>
    <client-only>
        <LandingIntro />
        <LandingPopular />
        <LandingRecent />
        <LandingFree />
        <LandingPremium />
        <LandingMintCase />
        <LeaderboardMain />
        <LandingWorking />
        <LandingPartner />
        <CommonProfile />
        <DialogWallet />
    </client-only>
  
</div>
</template>
<script>
import Three from "../components/section/mintShowcase/3dshow.vue"
export default {
    components:{Three}
    
}
</script>


