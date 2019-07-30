<template>
    <div class=register>
        <b-form action="#"  @submit.prevent="register">
        <b-container fluid>
            <b-row class="mb-2 justify-content-center" no-gutters>
                <b-col  col cols="10" xl="3" lg="4" md="5" sm="6">
                    <b-form-input class="rounded-0" placeholder="Account" v-model="username"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="mb-2 justify-content-center" no-gutters>
                <b-col col cols="10" xl="3" lg="4" md="5" sm="6">
                    <b-form-input class="rounded-0" placeholder="new password" type="password" v-model="password"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="mb-2 justify-content-center" no-gutters>
                <b-col col cols="10" xl="3" lg="4" md="5" sm="6">
                    <b-form-input class="rounded-0" placeholder="enter password again" type="password" v-model="password2"></b-form-input>
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
    name: 'register',
    data() {
        return {
            username: '',
            password: '',
            password2: ''
        }
    },
    methods: {
        register () {
            /*this.$store.dispatch('retrieveToken',{
                username: this.username,
                password: this.password
            })
            .then(response => {
                this.$router.push('/home')
            })*/
        }
    }
}
</script>
<style>
    .register {
        width:100%;
    }
</style>