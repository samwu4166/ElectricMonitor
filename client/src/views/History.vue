<template>
<div class="history">
    <b-card header-bg-variant="dark" v-if="loaded && errorStatus == null" no-body class="border-0">
        <b-tabs fill card pills v-model="tabIndex" nav-wrapper-class="bg-dark rounded-0"
        active-tab-class="p-0 m-0">
            <b-tab :title-link-class="tabClass(index)" v-for="(tab, index) in tab_name" :key='index' :title='tab'>
                    <HistoryChart class="mx-auto" :tab_name="tab" :data="getTabData(tab)" :date="date" :index="index"></HistoryChart>
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
        tabIndex: 0,
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
                var now = new Date(this.historyData[i].datetime)
                var s = (now.getSeconds() < 10 ? '0' : '') + now.getSeconds()
                var m = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes()
                var h = (now.getHours() < 10 ? '0' : '') + now.getHours()
                var dd = (now.getDate() < 10 ? '0' : '') + now.getDate()
                var MM = ((now.getMonth() + 1) < 10 ? '0' : '') + (now.getMonth() + 1)
                var yyyy = now.getFullYear()
                date.push(yyyy+'/'+ MM + '/' + dd + ' ' + h + ':' + m + ':' + s)
            }
            return date
        },
    ...mapState([
        'historyData','errorStatus'
    ])
    },
    methods: {
        async getHistoryData(){
            await this.$store.dispatch('getHistoryData', this.$route.params.tagname);
            this.loaded = true
        },
        getTabData(tab_name){
            var length = this.historyData.length
            var data = []
            for(var i = 0; i < length; i++){
                data.push(this.historyData[i][tab_name])
            }
            return data
        },
        tabClass(index){
            if(this.tabIndex === index){
                return ['bg-white','text-dark']
            }
            else{
                return ['bg-dark','text-white']
            }
        }
    }
}
</script>
<style>
.history{
    height: 100%;
}
</style>