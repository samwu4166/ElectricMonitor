<template>
    <div class="nav">
        <b-navbar toggleable="md" type="dark" variant="info" fixed="top">
            <b-navbar-brand href="#">TheWorld</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-text>test2</b-nav-text>
                </b-navbar-nav>
                <b-navbar-nav v-if="!loggedIn" class="ml-auto">
                    <b-nav-item @click="onLoginClick">LOGIN</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav v-if="!loggedIn">
                    <b-nav-item @click="onRegisterClick">REGISTER</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav v-if="loggedIn" class="ml-auto">
                    <b-nav-item @click="onLogoutClick">LOGOUT</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default{
    computed: {
        loggedIn(){
            return this.$store.getters.loggedIn
        }
    },
    methods: {
        onLoginClick(){
            this.$router.push('/login')
        },
        onLogoutClick(){
            this.$router.push('/logout')
        },
        onRegisterClick(){
            this.$router.push('/register')
        }
    }
}
</script>

<style>
</style>
