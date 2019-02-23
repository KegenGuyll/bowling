<template>
  <div>
    <br>
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
            <b-card>
              <h4 class="title-card">Login</h4>
              <a class="float-right" slot="header">
                <router-link to="/register">
                  <h6 class="mb-0">Register</h6>
                </router-link>
              </a>
              <b-form @submit="login">
                <input v-model="email" class="spacer" type="text" placeholder="Email">
                <input v-model="password" class="spacer" type="password" placeholder="Password">
                <div>
                  <input type="submit" value="Login">
                </div>
                <br>
                <a
                  style="color: #2979ff;text-decoration: none;background-color: transparent;"
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
.card {
  background: #222527;
  text-align: center;
}
.card input[type="text"],
.card input[type="password"] {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #2979ff;
  padding: 14px 10px;
  width: 200px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
}
.card input[type="text"]:focus,
.card input[type="password"]:focus {
  width: 280px;
  border-color: #00e676;
}
.card input[type="submit"] {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #00e676;
  padding: 14px 40px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;
}
.card input[type="submit"]:focus {
  background: #00e676;
}
.card input[type="submit"]:hover {
  background: #00e676;
}
.card a {
  color: #2979ff;
}
.card h4 {
  color: white;
  text-transform: uppercase;
  font-weight: 500;
}
</style>
