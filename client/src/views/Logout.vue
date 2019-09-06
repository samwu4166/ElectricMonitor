<template>
    <div></div>
</template>

<script>
import { clearTimeout } from 'timers';
export default {
    created(){
        this.$store.dispatch('destroyAccessToken')
        .then(() => {
            this.$router.push('/login')
        })
    },
    beforeDestroy() {
        this.$store.getters.expireTimeout && clearTimeout(this.$store.getters.expireTimeout)
    }
}
</script>