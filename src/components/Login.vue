<template>
  <b-container fluid>
    <b-row class="justify-content-md-center">
      <b-col col s="12" md="6">
        <div>
          <b-card class="spacer" title="Login">
            <a slot="header">
              <router-link to="/register">
                <h6 class="mb-0">Register</h6>
              </router-link>
            </a>
            <b-form-input v-model="email" class="spacer" type="email" placeholder="Email"></b-form-input>
            <b-form-input v-model="password" class="spacer" type="password" placeholder="Password"></b-form-input>
            <div v-if="email && password">
              <b-button v-on:click="login">Login</b-button>
            </div>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import db from "../../firebaseInit.js";
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        // eslint-disable-next-line
        .then(
          user => {
            this.$router.go({ path: this.$router.path });
            //alert("Logged in");
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>

<style>
.spacer {
  margin-top: 2vh;
  margin-bottom: 2vh;
}
</style>
