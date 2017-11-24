<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body, ul, dl, dd, h1, h2, h3, h4, h5, h6, p{
  margin: 0;
  padding: 0;
}
body{
  background: #f2f2f2;
}
html{
  font-size: calc(100vw / 37.5);
}
li{
  list-style: none;
}
a{
  text-decoration: none;
}
</style>
