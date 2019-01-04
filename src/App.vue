<template>
  <div id="app">
    <NavBar/>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/Navbar";
export default {
  name: "app",
  components: {
    NavBar
  }
};
</script>

<style>
body {
  background-color: #121d26;
}
</style>


