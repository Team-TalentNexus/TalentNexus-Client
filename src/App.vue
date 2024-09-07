<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  text-align: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  background-color: #3498db;
  padding: 20px;
  color: white;
}

header h1 {
  margin: 0;
}

footer {
  background-color: #2ecc71;
  color: white;
  padding: 10px 0;
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
