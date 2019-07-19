<template>
    <div class=login>
        <b-container fluid>
            <b-row class="mb-2 justify-content-center" no-gutters>
                <b-col  col cols="10" xl="3" lg="4" md="5" sm="6">
                    <b-form-input class="rounded-0" placeholder="Account">test</b-form-input>
                </b-col>
            </b-row>
            <b-row class="mb-2 justify-content-center" no-gutters>
                <b-col col cols="10" xl="3" lg="4" md="5" sm="6">
                    <b-form-input class="rounded-0" placeholder="Password" type="password">test</b-form-input>
                </b-col>
            </b-row>
            <b-row class="justify-content-center" no-gutters>
                <b-col>
                    <b-button class="rounded-0" @click="login" variant="primary">LOGIN</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    methods: {
        login () {
            this.$cookies.set('session',{})
            this.$router.push('/home')
        }
    }
}
</script>
<style>
    .login {
        width:100%;
    }
</style>