<template>
  <div>
    <b-alert
      dismissible
      :show="success"
      @dismissed="success=true"
      variant="success"
    >{{successMessage}}</b-alert>
    <b-alert variant="danger" dismissible :show="error" @dismissed="error=false">{{errorMessage}}</b-alert>
    <b-container fluid>
      <b-row class="justify-content-md-center">
        <b-col col s="12" md="6">
          <div>
            <b-card class="spacer">
              <h4 class="title-card">Login</h4>
              <a class="float-right" slot="header">
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
                <a
                  style="color: #007bff;text-decoration: none;background-color: transparent;"
                  v-b-modal.resetP
                >Forgot Password?</a>
              </b-form>
            </b-card>
            <b-modal centered @ok="resetPassword" id="resetP" title="Email you use to login">
              <b-form>
                <b-form-input
                  class="bottom-input"
                  type="email"
                  required
                  placeholder="Reset Email"
                  v-model="resetEmail"
                ></b-form-input>
              </b-form>
            </b-modal>
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
      resetEmail: "",
      password: "",
      success: false,
      successMessage: "",
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
    },
    resetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.resetEmail)
        .then(() => {
          this.success = true;
          this.successMessage = "Email sent successfully";
          this.resetEmail = "";
        })
        .catch(e => {
          this.error = true;
          this.errorMessage = e.message;
          this.resetEmail = "";
        });
    }
  }
};
</script>

<style scoped>
.spacer {
  margin-top: 2vh;
  margin-bottom: 2vh;
}
</style>
