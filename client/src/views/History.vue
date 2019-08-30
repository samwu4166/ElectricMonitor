<template>
<div class="history">
    <b-card no-body>
        <b-tabs fill card>
            <b-tab v-for="(tab, index) in tab_name" :key='index' :title='tab'>
                    <HistoryChart class="mx-auto" v-if="loaded" :tab_name="tab" :data="getTabData(tab)" :date="date" :index="index"></HistoryChart>
            </b-tab>
        </b-tabs>
    </b-card>
</div>
</template>

<script>
import { mapState } from 'vuex'
import HistoryChart from '../components/History_chart'
export default{
    components: {
        HistoryChart
    },
    mounted(){
        this.getHistoryData();
    },
    data: () => ({
        loaded: false,
        tab_name: ['rs_v', 'st_v', 'tr_v', 'r_a', 's_a', 't_a', 'kwh', 'pf', 'kw']
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
        },
        getTabData(tab_name){
            var length = this.historyData.length
            var data = []
            for(var i = 0; i < length; i++){
                data.push(this.historyData[i][tab_name])
            }
            return data
        }
    }
}
</script>
<style>
.history{
    height: 100%;
}
</style>