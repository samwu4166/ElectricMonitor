<template>

</template>

<script>
export default {
    created(){
        this.$store.dispatch('destroyAccessToken')
        .then(response => {
            this.$router.push('/login')
        })
    }
}
</script>