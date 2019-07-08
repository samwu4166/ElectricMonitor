<template>
  <div class="home">
    <p>test</p>
    <b-button @click="testOnClick">press</b-button>
    <b-table striped hover :items="data"></b-table>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
  },
  methods: {
    testOnClick(){
      console.log('testeststse');
      this.$store.dispatch('getData');
    }
  },
  computed: mapState([
    'data'
  ])
}
</script>