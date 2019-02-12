<template>
  <div>
    <!-- Just an image -->
    <b-navbar variant="faded" type="light">
      <b-navbar-brand to="/settings">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 224 224"
          style=" fill:#000000;"
        >
          <g
            fill="none"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style="mix-blend-mode: normal"
          >
            <path d="M0,224v-224h224v224z" fill="none"></path>
            <g fill="#ffffff">
              <g id="surface1">
                <path
                  d="M156.625,13.3525c-2.3275,0.07 -4.5325,1.05 -6.16,2.7125l-89.6,89.6c-3.5,3.5 -3.5,9.17 0,12.67l89.6,89.6c2.24,2.345 5.5825,3.29 8.7325,2.4675c3.1325,-0.8225 5.5825,-3.2725 6.405,-6.405c0.8225,-3.15 -0.1225,-6.4925 -2.4675,-8.7325l-83.265,-83.265l83.265,-83.265c2.6425,-2.5725 3.4475,-6.51 2.0125,-9.9225c-1.4525,-3.395 -4.83,-5.565 -8.5225,-5.46z"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </b-navbar-brand>
    </b-navbar>
    <br>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="success"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >Profile Updated Successfully.</b-alert>
    <b-container>
      <div>
        <b-card header-tag="header" footer="Card Footer">
          <h6 slot="header" class="mb-0" v-if="displayName != null">Profile View: {{displayName}}</h6>
          <h6 slot="header" class="mb-0" v-if="displayName == null">Profile View: {{email}}</h6>
          <div>
            <b-row>
              <b-col sm="3">
                <label for="displayName">Display Name</label>
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
                <label for="email">Email</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="Enter your Email.."
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="3">
                <label for="PhotoUrl">PhotoUrl</label>
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
                <label for="uid">UID</label>
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
import db from "../../firebaseInit.js";

export default {
  name: "profile",
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
          photoURL: this.photoURL
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
