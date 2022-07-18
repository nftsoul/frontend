<template>
<div>
    <client-only>
        <SectionLandingIntro />
        <three></three>
        <SectionLandingPopular />
        <SectionLandingRecent />
        <SectionLandingFree />
        <SectionLandingPremium />
        <SectionLeaderboardMain />
        <SectionLandingWorking />
        <SectionLandingPartner />
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


