<template>
<div class="history">
    <HistoryChart v-if="loaded" :data="data" :date="date"></HistoryChart>
</div>
</template>

<script>
import { mapState } from 'vuex'
import HistoryChart from '../components/History_chart'
export default{
    components:{
        HistoryChart
    },
    mounted(){
        this.getHistoryData();
    },
    data: () => ({
        loaded: false,
    }),
    computed: {
        data: function(){
            var length = this.historyData.length
            var data1 = []
            for(var i = 0; i < length; i++){
                data1.push(this.historyData[i].r_a)
            }
            return data1
        },
        date: function(){
            var length = this.historyData.length
            var date = []
            for(var i = 0; i < length; i++){
                date.push(this.historyData[i].datetime)
            }
            return date
        },
    ...mapState([
        'historyData'
    ])
    },
    methods: {
        async getHistoryData(){
            await this.$store.dispatch('getHistoryData', this.$route.params.tagname);
            console.log(this.historyData)
            this.loaded = true
        }
    }
}


</script>