<template>
    <div>
        <b-form inline action="#" @submit.prevent="key_generate">
            <label for="select" class="mt-2 ml-2 mr-2">Key Generation</label>
            <b-form-select class="mr-2 mt-2" id="select" v-model="permission" :options="options" required></b-form-select>
            <b-button class="mt-2" type="submit" variant="primary">generate</b-button>
            <p>{{key}}</p>
        </b-form>
    </div>
</template>
<script>
export default{
    data(){
        return {
            permission: null,
            options: [{text: "permission", value: null}, 0, 1, 2],
            key: null
        }
    },
    methods:{
        key_generate(){
            this.$store.dispatch('key_generation', this.permission)
            .then(response => {
                this.key = this.$store.getters.getBackendKeyGenerationKey
            })
        }
    }
}
</script>