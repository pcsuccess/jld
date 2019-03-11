<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
/*  text-align: center;*/
  color: #2c3e50;
  width: 100%;
}
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
* {
  width: 100%;
}
body {
  font-size: 14px;
  color: #333;
  width: 100%;
  height: 100%;
  background-color:#f1f1f1;
}
ul,ol {
  list-style: none;
}
a {
  text-decoration: none;
  color: #333;
}
.clearFix::before,
.clearFix::after {
  content: "";
  display: block;
  visibility: hidden;
  height: 0;
  line-height: 0;
  clear: both;
}
</style>
