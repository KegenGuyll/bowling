<template>
  <div>
    <b-alert v-if="success == true" variant="success" show>Logged in Successfully</b-alert>
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

<style scoped>
.spacer {
  margin-top: 2vh;
  margin-bottom: 2vh;
}
/* .form-control::-webkit-input-placeholder {
  color: rgb(36, 36, 36);
}
.form-control:-moz-placeholder {
  color: white;
}
.form-control::-moz-placeholder {
  color: white;
}
.form-control:-ms-input-placeholder {
  color: white;
}
.form-control::-ms-input-placeholder {
  color: white;
}

.form-control:focus {
  color: #212121;
  background-color: rgb(114, 114, 114);
  border-color: #505050;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(31, 31, 31, 0.356);
} */

/* .card {
  background-color: #424242;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212121;
  background-color: #424242;
  background-clip: padding-box;
  border: 1px solid #3b3b3b;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.card-title {
  color: #000000;
}

.btn-secondary {
  color: #fff;
  background-color: #212121;
  border-color: #212121;
} */
</style>
