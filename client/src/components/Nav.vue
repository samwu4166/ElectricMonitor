<template>
    <div class="nav">
        <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
            <b-navbar-brand href="#">系統</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                
                <b-navbar-nav id="home" v-if="loggedIn" class="ml-auto">
                    <b-nav-item @click="onHomeClick">首頁</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav id="management" v-if="loggedIn && (permission === '1' || permission === '0')">
                    <b-nav-item @click="onAccountManagementClick">帳號管理</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav id="management" v-if="loggedIn && permission==='0'">
                    <b-nav-item @click="onManagementClick">後台</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav v-if="!loggedIn" class="ml-auto">
                    <b-nav-item @click="onLoginClick">登入</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav v-if="!loggedIn">
                    <b-nav-item @click="onRegisterClick">註冊</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav v-if="loggedIn">
                    <b-nav-item @click="onLogoutClick">登出</b-nav-item>
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
        },
        permission(){
            return this.$store.getters.getPermission
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
        },
        onHomeClick(){
            this.$router.push('/home')
        },
        onManagementClick(){
            this.$router.push('/backendManagement')
        },
        onAccountManagementClick(){
            this.$router.push('/accountManagement')
        }
    }
}
</script>

<style>
</style>
