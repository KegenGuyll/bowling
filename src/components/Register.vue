<template>
  <div>
    <b-alert v-if="success == true" variant="success" show>Account Created Successfully</b-alert>
    <b-alert variant="danger" dismissible :show="error" @dismissed="error=false">{{errorMessage}}</b-alert>
    <br>
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
              <input v-model="email" type="text" placeholder="Email">
              <input v-model="password" type="password" placeholder="Password">
              <input v-on:click="register" value="Register" type="submit">
            </b-card>
          </div>
        </b-col>
      </b-row>n
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
