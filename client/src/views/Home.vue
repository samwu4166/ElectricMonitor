<template>
  <div class="home">
    <b-table striped hover responsive :items="chartdata" @row-clicked="rowClickHandler"></b-table>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
  },
  mounted(){
    this.getData();
  },
  data: () => ({
    loaded: false,
    chartdata: [],

  }),
  methods: {
    async getData(){
      await this.$store.dispatch('getData');
      this.loaded = true
      this.chartdata = []
      this.data.msg.data.forEach(da => {
        da['_cellVariants'] = {}
        var props = Object.keys(da).slice(3,12)
        var len = props.length
        for(var i = 0; i < len; i++){
          if(da[props[i]] > 15){
            da['_cellVariants'][props[i]] = 'danger'
          }
        }
        this.chartdata.push(da)
      })

      this.timeout = setTimeout(() => {
        this.getData();
      }, 10000);
    },
    rowClickHandler(record, index){
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
    'data'
  ])
  },
  beforeDestroy(){
    this.timeout && clearTimeout(this.timeout);
  }
}
</script>