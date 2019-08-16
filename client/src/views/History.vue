<template>
<div class="history">
    <b-table striped hover responsive :items="chartdata"></b-table>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default{
    mounted(){
        this.getHistoryData();
    },
    data: () => ({
        loaded: false,
        chartdata: []
    }),
    methods: {
        async getHistoryData(){
            await this.$store.dispatch('getHistoryData', this.$route.params.tagname);
            this.loaded = true
            this.chartdata = this.historyData.msg.data            
        }
    },
    computed: {
    ...mapState([
        'historyData'
    ])
    }
}


</script>