<template>
  <div>
    <b-navbar style="background-color: #000000 !important" type="dark" variant="primary" toggleable>
      <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_dropdown_collapse">
        <b-navbar-nav>
          <b-nav-item v-if="isLoggedIn == true">
            <router-link style="color: rgba(255, 255, 255, 0.5);" to="/">Dashboard</router-link>
          </b-nav-item>
          <b-nav-item v-if="isLoggedIn == false">
            <router-link style="color: rgba(255, 255, 255, 0.5);" to="/register">Register</router-link>
          </b-nav-item>
          <b-nav-item v-if="isLoggedIn" v-on:click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import firebase from "firebase";
export default {
  name: "NavBar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>

<style>
.bg-primary {
  background-color: #000000 !important;
}
nav {
  background-color: #000000;
}
</style>

