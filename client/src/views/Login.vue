<template>
    <div class=login>
        <b-form action="#"  @submit.prevent="login">
        <b-container fluid>
            <b-row class="mb-2 justify-content-center" no-gutters>
                <b-col  col cols="10" xl="3" lg="4" md="5" sm="6">
                    <b-form-input class="rounded-0" placeholder="Account" v-model="username"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="mb-2 justify-content-center" no-gutters>
                <b-col col cols="10" xl="3" lg="4" md="5" sm="6">
                    <b-form-input class="rounded-0" placeholder="Password" type="password" v-model="password"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="justify-content-center" no-gutters>
                <b-col>
                    <b-button class="rounded-0" variant="primary" type="submit">Log In</b-button>
                </b-col>
            </b-row>
        </b-container>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login () {
            this.$store.dispatch('loginAuth',{
                username: this.username,
                password: this.password
            })
            .then(response => {
                if(this.$store.getters.getPermission === '0'){
                    this.$router.push('/backendManagement')
                }
                else{
                    this.$router.push('/home')
                }
            })

        }
    }
}
</script>
<style>
    .login {
        width:100%;
        padding-top:calc((100vh - 11.5rem)/2);
    }
</style>