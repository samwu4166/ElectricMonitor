<template>
  <div id="app">
    <Nav></Nav>
    <router-view id="router"></router-view>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
export default {
  components:{
    Nav
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
  justify-content: flex-start;
  align-items: center;
}
#router {
  margin-top:3.5rem;
  width:100%;
  max-width: 100%;
  /*padding-top:calc((100vh - 11.5rem)/2);     垂直置中*/
}
</style>
