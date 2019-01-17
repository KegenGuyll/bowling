<template>
  <div>
    <b-navbar style="background-color: #000000 !important" type="dark" variant="primary" toggleable>
      <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_dropdown_collapse">
        <b-navbar-nav>
          <b-nav-item v-if="displayName != null && isLoggedIn == true">
            <b-img
              rounded="circle"
              width="30"
              height="30"
              v-if="photoUrl != ''"
              v-bind:src="photoUrl"
            />
            <strong>Hello {{displayName}}</strong>
          </b-nav-item>
          <b-nav-item v-if="isLoggedIn == true">
            <router-link style="color: rgba(255, 255, 255, 0.5);" to="/">Dashboard</router-link>
          </b-nav-item>
          <b-nav-item v-if="isLoggedIn == true">
            <router-link style="color: rgba(255, 255, 255, 0.5);" to="/settings">Settings</router-link>
          </b-nav-item>
          <b-nav-item v-if="isLoggedIn == false">
            <router-link style="color: rgba(255, 255, 255, 0.5);" to="/login">Login</router-link>
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
      currentUser: false,
      displayName: "",
      photoUrl: ""
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      this.displayName = user.displayName;
      this.email = user.email;
      this.photoUrl = user.photoURL;
      this.emailVerified = user.emailVerified;
      this.uid = user.uid;
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

