<template>
  <div>
    <backarrow/>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="success"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >Profile Updated Successfully.</b-alert>
    <b-alert variant="danger" :show="error" dismissible>{{errorMessage}}</b-alert>
    <br>
    <b-container>
      <div>
        <b-card class="black bottomBorder" header-tag="header" footer="Card Footer">
          <h6 slot="header" class="mb-0" v-if="displayName != null">Profile View: {{displayName}}</h6>
          <h6 slot="header" class="mb-0" v-if="displayName == null">Profile View: {{email}}</h6>
          <div>
            <b-input-group prepend="Name">
              <b-form-input
                class="form"
                id="displayName"
                v-model="displayName"
                type="text"
                placeholder="Enter your Name"
              ></b-form-input>
            </b-input-group>
            <br>
            <div v-on:click="toaster('Email')">
              <b-input-group prepend="Email">
                <b-form-input
                  disabled
                  class="form-disabled"
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="Enter your Email.."
                ></b-form-input>
              </b-input-group>
            </div>
            <br>
            <b-input-group prepend="PhotoUrl">
              <b-form-input
                id="PhotoUrl"
                class="form"
                v-model="photoUrl"
                type="url"
                placeholder="Enter your Pic..."
              ></b-form-input>
            </b-input-group>
            <br>
            <div v-on:click="toaster('UID')">
              <b-input-group prepend="UID">
                <b-form-input
                  class="form-disabled"
                  disabled
                  id="uid"
                  v-model="uid"
                  type="text"
                  placeholder="User ID.."
                ></b-form-input>
              </b-input-group>
            </div>
          </div>
          <div slot="footer">
            <b-button v-on:click="updateUser" variant="success">Save</b-button>
          </div>
        </b-card>
      </div>
    </b-container>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../../../firebaseInit.js";
import backarrow from "./Backarrow";

export default {
  name: "profile",
  components: {
    backarrow
  },
  data() {
    return {
      displayName: "",
      email: "",
      photoUrl: "",
      uid: "",
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      errorMessage: "",
      error: false
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
    toaster(data) {
      this.$toaster.error(`${data} is not a editable field`);
    },
    updateUser() {
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: this.displayName,
          photoURL: this.photoUrl
        })
        .then(() => {
          this.showAlert();
        })
        .catch(e => {
          this.errorMessage = e.message;
          this.error = true;
        });
    },
    User() {
      this.displayName = this.$route.params.UserData.displayName;
      this.email = this.$route.params.UserData.email;
      this.photoUrl = this.$route.params.UserData.photoUrl;
      this.uid = this.$route.params.UserData.uid;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>

<style scope>
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
