<template>
    <div class=register>
        <b-container fluid>
            <b-form action="#"  @submit.prevent="register">
                <b-row class="mb-2 justify-content-center" no-gutters>
                    <b-col  col cols="10" xl="3" lg="4" md="5" sm="6">
                        <b-form-input class="rounded-0" placeholder="輸入您的註冊碼" v-model="verifyToken"></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="mb-2 justify-content-center" no-gutters>
                    <b-col  col cols="10" xl="3" lg="4" md="5" sm="6">
                        <b-form-input class="rounded-0" placeholder="帳號" v-model="username" :state="validate_account"></b-form-input>
                        <b-form-invalid-feedback :state="validate_account">
                            帳號只能為6 - 20位英文字母或數字
                        </b-form-invalid-feedback>
                    </b-col>
                </b-row>
                <b-row class="mb-2 justify-content-center" no-gutters>
                    <b-col col cols="10" xl="3" lg="4" md="5" sm="6">
                        <b-form-input class="rounded-0" placeholder="密碼" type="password" v-model="password" :state="validate_password"></b-form-input>
                        <b-form-invalid-feedback :state="validate_password">
                            密碼只能為6 - 20位英文字母或數字
                        </b-form-invalid-feedback>
                    </b-col>
                </b-row>
                <b-row class="mb-2 justify-content-center" no-gutters>
                    <b-col col cols="10" xl="3" lg="4" md="5" sm="6">
                        <b-form-input class="rounded-0" placeholder="再輸入一次密碼" type="password" v-model="password2" :state="validate_password2"></b-form-input>
                        <b-form-invalid-feedback :state="validate_password2">
                            與密碼不同
                        </b-form-invalid-feedback>
                    </b-col>
                </b-row>
                <b-row class="justify-content-center" no-gutters>
                    <b-col>
                        <b-button class="rounded-0" variant="dark" type="submit">註冊</b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'register',
    data() {
        return {
            verifyToken: '',
            username: '',
            password: '',
            password2: ''
        }
    },
    computed:{
        validate_account(){
            var p = /[^A-Za-z0-9]/;
            var size = /^\w{6,20}$/;
            return this.username.match(p)?false:this.username.match(size)?true:false;
        },
        validate_password(){
            var p = /[^A-Za-z0-9]/;
            var size = /^\w{6,20}$/;
            return this.password.match(p)?false:this.password.match(size)?true:false;
        },
        validate_password2(){
            return this.password === this.password2
        }
    },
    methods: {
        register () {
            this.$store.dispatch('register', {
                username: this.username,
                password: this.password,
                verifyToken: this.verifyToken
            })
            .then(() => {
                this.$router.push('/login')
            })
        }
    }
}
</script>
<style>
    .register {
        width:100%;

    }
</style>