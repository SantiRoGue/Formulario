<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logoA.png">
    <Formu/>
  
  </div>
</template>

<script>

import Formu from './components/Formu.vue'

export default {
  name: 'App',
  components: {    
    Formu
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
