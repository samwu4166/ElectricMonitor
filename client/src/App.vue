<template>
  <div id="app">
    <Nav></Nav>
    <Alert id="alert"></Alert>
    <router-view id="router"></router-view>
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
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

  /*padding-top:calc((100vh - 11.5rem)/2);     垂直置中*/
}
</style>
