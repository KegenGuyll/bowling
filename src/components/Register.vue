<template>
  <div>
    <b-alert v-if="success == true" variant="success" show>Account Created Successfully</b-alert>
    <b-alert variant="danger" dismissible :show="error" @dismissed="error=false">{{errorMessage}}</b-alert>
    <b-container fluid>
      <b-row class="justify-content-md-center">
        <b-col col s="12" md="6">
          <div>
            <b-card class="spacer" title="Register">
              <a class="float-right" slot="header">
                <router-link to="/login">
                  <h6 class="mb-0">Login</h6>
                </router-link>
              </a>
              <b-form-input v-model="email" class="spacer" type="email" placeholder="Email"></b-form-input>
              <b-form-input
                v-model="password"
                class="spacer"
                type="password"
                placeholder="Password"
              ></b-form-input>
              <div v-if="email && password">
                <b-button v-on:click="register">Register</b-button>
              </div>
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
    register: function(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.push("/");
            //alert("account created");
            this.email = "";
            this.password = "";
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
