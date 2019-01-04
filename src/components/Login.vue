<template>
  <div>
    <b-alert v-if="success == true" variant="success" show>Logged in Successfully</b-alert>
    <b-alert variant="danger" dismissible :show="error" @dismissed="error=false">{{errorMessage}}</b-alert>
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
              <b-form @submit="login">
                <b-form-input v-model="email" class="spacer" type="email" placeholder="Email"></b-form-input>
                <b-form-input
                  v-model="password"
                  class="spacer"
                  type="password"
                  placeholder="Password"
                ></b-form-input>
                <div v-if="email && password">
                  <b-button type="submit">Login</b-button>
                </div>
              </b-form>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
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
      password: "",
      success: false,
      error: false,
      errorMessage: ""
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
            this.error = true;
            this.errorMessage = err.message;
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
