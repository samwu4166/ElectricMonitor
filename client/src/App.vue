<template>
  <div id="app">
    <b-container fluid class="h-100">
      <b-row>
        <Nav></Nav>
      </b-row>
      <b-row>
        <Alert id="alert"></Alert>
      </b-row>
      <b-row align-v="center">
        <router-view id="router"></router-view>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
import Alert from './components/Alert'
export default {
  components:{
    Nav, Alert
  }
}
</script>

<style lang="scss">
html, body{
  height:100%;
  padding:0;
  margin:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
}
#alert {
  margin-top:56px;
  width:100%;
  max-width: 100%;
}
#router {
  margin-top:56px;
  width:100%;
  max-width: 100%;
  height: calc(100% - 56px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
