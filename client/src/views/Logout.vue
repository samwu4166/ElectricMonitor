<template>
    <div></div>
</template>

<script>
export default {
    created(){
        this.$store.dispatch('destroyAccessToken')
        .then(() => {
            this.$router.push('/login')
        })
    },
    beforeDestroy() {
        this.expireTimeout && window.clearTimeout(this.expireTimeout)
        this.$store.commit('SET_EXPIRETIMEOUT', 0);
    },
    computed: {
        expireTimeout: {
            get(){
                return this.$store.state.expireTimeout;
            },
            set(val){
                return this.$store.commit('SET_EXPIRETIMEOUT', val);
            }
        }
    }
}
</script>