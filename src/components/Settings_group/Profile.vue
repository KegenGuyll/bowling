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
    <br>
    <b-container>
      <div>
        <b-card header-tag="header" footer="Card Footer">
          <h6 slot="header" class="mb-0" v-if="displayName != null">Profile View: {{displayName}}</h6>
          <h6 slot="header" class="mb-0" v-if="displayName == null">Profile View: {{email}}</h6>
          <div>
            <b-row>
              <b-col sm="3">
                <label for="displayName">Display Name:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  id="displayName"
                  v-model="displayName"
                  type="text"
                  placeholder="Enter your Name"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="3">
                <label for="email">Email:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="Enter your Email.."
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="3">
                <label for="PhotoUrl">PhotoUrl:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  id="PhotoUrl"
                  v-model="photoUrl"
                  type="url"
                  placeholder="Enter your Pic..."
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="3">
                <label for="uid">UID:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input disabled id="uid" v-model="uid" type="text" placeholder="User ID.."></b-form-input>
              </b-col>
            </b-row>
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
      showDismissibleAlert: false
    };
  },
  created() {
    const user = firebase.auth().currentUser;

    if (user != null) {
      this.displayName = user.displayName;
      this.email = user.email;
      this.photoUrl = user.photoURL;
      this.uid = user.uid;
    }
  },
  methods: {
    updateUser() {
      var user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: this.displayName,
          photoURL: this.photoUrl
        })
        .then(() => {
          this.showAlert();
        })
        .catch(e => {
          this.errorMessage = e;
        });
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

