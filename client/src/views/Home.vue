<template>
  <div>
    <div class="home">
      <b-table
      sticky-header="calc(100%)"
      responsive
      striped
      hover
      v-if="errorStatus == null"
      :items="chartdata"
      :fields="fields"
      :busy.sync="isLoading"
      head-variant="dark"
      @row-clicked="rowClickHandler">
      </b-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  name: 'home',
  mounted(){
    this.isLoading = true
    this.getData();
    this.isLoading = false
  },
  data: () => ({
    isLoading: true,
    chartdata: [],
    fields: [
      { key: 'tagname', stickyColumn: true, isRowHeader: true, variant: "dark"},
      'site',
      'kwh',
      'kw',
      'st_v',
      'rs_v',
      'tr_v',
      'r_a',
      's_a',
      't_a',
      'pf',
      { key: 'datetime', label: '時間'}
    ]
  }),
  methods: {
    async getData(){
      await this.$store.dispatch('getData')
      this.chartdata = []
      //this.data.msg.data.foreach
      this.data?this.data.forEach(da => {
        var d = new Date(da.datetime.split('Z')[0])
        da.datetime = d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
        this.chartdata.push(da)
      }):(null)

      this.timeout = setTimeout(() => {
        this.getData();
      }, 10000);
    },
    rowClickHandler(record){
      this.$router.push({name: 'history', params: { tagname: record.tagname[1] }})
    }
  },
  computed: {
  timeout: {
    get(){
      return this.$store.state.timeout;
    },
    set(val){
      this.$store.commit('SET_TIMEOUT', val);
    }
  },
  ...mapState([
    'data','errorStatus'
  ])
  },
  beforeDestroy: function(){
    this.timeout && clearTimeout(this.timeout);
  }
}
</script>

<style>
.home {
  width: 100%;
  align-self: flex-start;
  height: 100%;
  overflow: auto;
  white-space: nowrap;
}
.alert{
  max-width:80%;
  border-radius:5px;
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
}
</style>