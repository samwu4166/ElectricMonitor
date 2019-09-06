<template>
    <b-alert class="alert" :show="errorStatus !== null" variant="danger">
        {{ alert_text }}
    </b-alert>
</template>
<script>
import { mapState } from 'vuex'
export default{
    computed: {
        ...mapState([
            'errorStatus'
        ]),
        alert_text: function() {
            var text = null;
            if(this.errorStatus == 'timeout'){
                text = "Timeout due to server not response"
            }
            else{
                switch(this.errorStatus){
                    case 0:
                        text="invalid token format";
                        break;
                    case 1:
                        text="user single login limit";
                        break;
                    case 2:
                        text="Your account have no permission to enter the data";
                        break;
                    case 3:
                        text="invalid token";
                        break;
                    case 4:
                        text="Your account has bveen suspend";
                        break;
                    case 5:
                        text="sql connection lost or failure";
                        break;
                    case 51:
                        text="sql query error";
                        break;
                    case 6:
                        text="redis connection lost or redis error";
                        break;
                    case 7:
                        text="Wrong Account or Password";
                        break;
                    case 8:
                        text="register failed due to duplicate account or something else";
                        break;
                    default:
                        text="Express server down. Please contect server administrator for any help."
                        break;
                }
            }
            return text;
        }
    }
}
</script>
<style>
.alert{
    border-radius:5px;
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
}
</style>