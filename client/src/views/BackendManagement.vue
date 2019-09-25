<template>
<div class="backendManagement">
    <b-container fluid>
        <b-row>
            <KeyGeneration></KeyGeneration>
        </b-row>
    </b-container>
</div>
</template>

<script>
import KeyGeneration from "../components/Key_generation.vue"
export default{
    components:{
        KeyGeneration
    }
}
</script>