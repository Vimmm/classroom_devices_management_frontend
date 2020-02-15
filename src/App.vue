<template>
  <div id="app">
    <headers v-if="$route.path !== '/login'" />
    <!-- <div id="nav">
      <router-link to="/">Login</router-link> |
      <router-link to="/admin">Admin</router-link> |
      <router-link to="/repairer">Repairer</router-link> |
      <router-link to="/school">School</router-link> 
    </div> -->
    <router-view class="app-content"/>
  </div>
</template>

<script>
import Headers from './components/common/headers'
export default {
  name: 'app',
  components: {
    Headers
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 1000px;
  margin: 0 auto;
}
body * {
  // background-color: rgba(0 ,0, 0, .1);
}
.app-content {
  padding-top: 80px;
  box-sizing: border-box;
  min-height: 100vh;
}
</style>
