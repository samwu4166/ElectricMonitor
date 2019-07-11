<template>
  <div class="home">
    <div v-if="loaded">
      <b-container fluid d-flex>
        <b-row v-for="n in 3" :key="n">
          <b-col v-for="m in 3" :key="m">
            <rt-barchart v-if='chartdata[(n-1)*3+m-1]' :chartData='chartdata[(n-1)*3+m-1]' :title='data[(n-1)*3+m-1]["tagname"]'></rt-barchart>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-table striped hover :items="data"></b-table>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import rtBarchart from '../components/Data_realtime_barchart.vue'
export default {
  name: 'home',
  components: {
    rtBarchart
  },
  mounted(){
    this.getData();
  },
  data: () => ({
    loaded: false,
    chartdata: null
  }),
  methods: {
    async getData(){
      await this.$store.dispatch('getData');
      this.loaded = true

      var new_chart_array = [];
      this.data.forEach(da => {
        const obj = {
          labels: Object.keys(da).slice(3, 12),
          datasets: [
            {
              label:da["tagname"],
              backgroundColor: function(context){
                var index = context.dataIndex;
                var value = context.dataset.data[index];
                return value < 5 ? '#F7FF00' :
                    value < 10 ? '#FF8000' :
                    value < 15 ? '#FF5700' :
                    '#FF0000';
              },
              data: Object.values(da).slice(3, 12)
            }
          ]
        }
        new_chart_array.push(obj)
      })
      this.chartdata = new_chart_array;

      this.timeout = setTimeout(() => {
        this.getData();
      }, 10000);
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
<style>
</style>