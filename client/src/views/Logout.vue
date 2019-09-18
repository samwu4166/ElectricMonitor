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
        this.expireTimeout && clearTimeout(this.expireTimeout)
    },
    computed: {
        expireTimeout: {
            get(){
                return this.$store.state.expireTimeout;
            },
            set(val){
                this.$store.commit('SET_EXPIRETIMEOUT', val);
            }
        }
    }
}
</script>