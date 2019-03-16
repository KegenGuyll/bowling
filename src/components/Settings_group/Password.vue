<template>
  <div>
    <backarrow/>
    <b-alert
      v-if="success == true"
      dismissible
      variant="success"
      @dismissed="success=false"
      show
    >{{successMessage}}</b-alert>
    <b-alert variant="danger" dismissible :show="error" @dismissed="error=false">{{errorMessage}}</b-alert>
    <br>
    <b-container>
      <b-card class="black bottomBorder" header-tag="header" footer="Card Footer">
        <h6 slot="header" class="mb-0" v-if="displayName != null">Password Change: {{displayName}}</h6>
        <h6 slot="header" class="mb-0" v-if="displayName == null">Password Change: {{email}}</h6>
        <b-form>
          <b-row>
            <b-col>
              <b-form-input
                id="currentPassword"
                class="bottom-input form"
                type="password"
                required
                placeholder="Current Password"
                v-model="currentPassword"
              ></b-form-input>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col>
              <b-form-input
                id="newPassword"
                class="bottom-input form"
                type="password"
                required
                placeholder="New Password"
                v-model="newPassword"
              ></b-form-input>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col>
              <b-form-input
                id="repeatPassword"
                class="bottom-input form"
                type="password"
                required
                placeholder="Repeat New Password"
                v-model="repeatPassword"
              ></b-form-input>
            </b-col>
          </b-row>
          <br>
          <a
            style="color: #007bff;text-decoration: none;background-color: transparent; cursor: pointer;"
            v-on:click="resetPassword"
          >Forgot password?</a>
        </b-form>
        <div slot="footer">
          <b-button
            v-if="repeatPassword === newPassword"
            v-on:click="reAuth"
            variant="success"
          >Change Password</b-button>
          <b-button
            disabled
            v-if="repeatPassword != newPassword"
            v-on:click="reAuth"
            variant="success"
          >Change Password</b-button>
        </div>
        <br>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import firebase from "firebase";
import backarrow from "./Backarrow";

export default {
  name: "Password",
  components: {
    backarrow
  },
  data() {
    return {
      currentPassword: "",
      repeatPassword: "",
      newPassword: "",
      email: "",
      displayName: "",
      photoUrl: "",
      uid: "",
      success: false,
      successMessage: "",
      error: false,
      errorMessage: ""
    };
  },
  created() {
    if (!this.$route.params.UserData) {
      const user = firebase.auth().currentUser;
      if (user != null) {
        this.displayName = user.displayName;
        this.email = user.email;
        this.photoUrl = user.photoURL;
        this.uid = user.uid;
      }
    } else {
      this.User();
    }
  },
  methods: {
    User() {
      this.displayName = this.$route.params.UserData.displayName;
      this.email = this.$route.params.UserData.email;
      this.photoUrl = this.$route.params.UserData.photoUrl;
      this.uid = this.$route.params.UserData.uid;
    },
    resetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          alert("Password Reset Email Sent!");
        })
        .catch(e => {
          alert(e.message);
        });
    },
    newPasswordMethod() {
      if (this.newPassword === this.repeatPassword) {
        const user = firebase.auth().currentUser;

        user
          .updatePassword(this.newPassword)
          .then(() => {
            this.successMethod(true, "Password Updated Successfully");
            this.clear();
          })
          .catch(e => {
            this.errorMethod(true, e.message);
            this.clear();
          });
      } else {
        this.errorMethod(true, "Passwords don't match");
        this.clear();
      }
    },
    reAuth() {
      var user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.currentPassword
      );
      // Prompt the user to re-provide their sign-in credentials
      user
        .reauthenticateAndRetrieveDataWithCredential(credential)
        .then(() => {
          // User re-authenticated.
          this.newPasswordMethod();
        })
        .catch(error => {
          // An error happened.
          this.errorMethod(true, error.message);
          this.clear();
        });
    },
    clear() {
      setTimeout(() => {
        this.currentPassword = "";
        this.newPassword = "";
        this.repeatPassword = "";
        this.success = false;
        this.successMessage = "";
        this.error = false;
        this.errorMessage = "";
      }, 2000);
    },
    successMethod(enabled, message) {
      this.success = enabled;
      this.successMessage = message;
    },
    errorMethod(enabled, message) {
      this.error = enabled;
      this.errorMessage = message;
    }
  }
};
</script>

<style scoped>
.bottomBorder {
  border-bottom: 5px solid #28a745;
  border-radius: 5px;
}

.black {
  background-color: #2a2a2c;
  color: #ffffff;
}

.form {
  background-color: #313131;
  color: #ffffff;
  border: 1px solid #2a2a2c;
}

.form:focus {
  background-color: #313131;
  color: #ffffff;
  border: 1px solid #2a2a2c;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 10px #b6b6b6;
}

.form-control:disabled {
  background-color: #313131;
  color: #808080;
  border: 1px solid #2a2a2c;
}

.input-group-text {
  background-color: #313131;
  color: #ffffff;
  border: 1px solid #2a2a2c;
}
</style>
