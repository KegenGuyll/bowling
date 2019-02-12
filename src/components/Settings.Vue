<template>
  <div class="justify-content-md-center">
    <b-alert
      v-if="success == true"
      dismissible
      variant="success"
      @dismissed="success=false"
      show
    >{{successMessage}}</b-alert>
    <b-alert variant="danger" dismissible :show="error" @dismissed="error=false">{{errorMessage}}</b-alert>
    <b-container>
      <b-card style="margin-top: 5vh;" no-body>
        <b-tabs pills card>
          <b-tab title="Account" active>
            <b-list-group flush>
              <b-list-group-item to="settings/profile">Profile</b-list-group-item>
              <b-list-group-item to="settings/password" v-b-modal.Password>Password</b-list-group-item>
              <b-list-group-item href="#" v-b-modal.scores>Scores</b-list-group-item>
              <b-list-group-item href="#" v-b-modal.friends>Friends</b-list-group-item>
              <b-list-group-item>Private Account
                <switches
                  style="float: right; margin-top:8px"
                  theme="bootstrap"
                  color="primary"
                  v-model="enabled"
                ></switches>
              </b-list-group-item>
              <b-list-group-item href="#">Delete Account</b-list-group-item>
            </b-list-group>
          </b-tab>
        </b-tabs>
      </b-card>
      <div>
        <b-modal centered @ok="CreatenewPassword" id="Password" title="Change your password">
          <b-form>
            <b-form-input
              class="bottom-input"
              type="password"
              required
              placeholder="Current Password"
              v-model="currentPassword"
            ></b-form-input>
            <b-form-input
              class="bottom-input"
              type="password"
              required
              placeholder="New Password"
              v-model="newPassword"
            ></b-form-input>
            <b-form-input
              class="bottom-input"
              type="password"
              required
              placeholder="Repeat New Password"
              v-model="repeatnewPassword"
              id="invaildPassword"
            ></b-form-input>
            <a
              style="color: #007bff;text-decoration: none;background-color: transparent;"
              v-on:click="resetPassword"
            >Forgot password?</a>
          </b-form>
        </b-modal>
        <b-modal centered id="friends">
          <b-input-group>
            <b-form-input type="text" placeholder="Seach by UID" v-model="search"></b-form-input>
            <b-input-group-append>
              <b-btn variant="outline-success" v-b-modal.Camera>Camera</b-btn>
              <b-button v-if="search != ''" variant="outline-success" v-on:click="searchUser">Search</b-button>
            </b-input-group-append>
          </b-input-group>
          <b-card v-if="searchedUser.name">
            <h5 class="card-title">
              {{searchedUser.name}}
              <b-img height="35" width="35" v-bind:src="searchedUser.photoUrl"></b-img>
            </h5>
            <p>Total Scores: {{searchedUser.totalScore}}</p>
            <p>Average Score: {{searchedUser.average}}</p>
            {{searchedUser.email}}
            {{searchedUser.uid}}
            <b-button class="float-right">Add Friend</b-button>
          </b-card>
        </b-modal>
        <b-modal centered id="scores">
          <b-card v-for="score in scores" v-bind:key="score.contentID">
            <h5 class="card-title">Scores</h5>
            <p class="float-left">{{score.y}}</p>
            <p class="float-right">{{score.x}}</p>
          </b-card>
        </b-modal>
        <b-modal centered id="Camera">
          <b-card>
            <div>
              <p class="decode-result">
                Last result:
                <b>{{ result }}</b>
              </p>
              <qrcode-stream @decode="onDecode" @init="onInit"/>
            </div>
          </b-card>
        </b-modal>
      </div>
    </b-container>
  </div>
</template>


<script>
import Switches from "vue-switches";
import firebase from "firebase";
import QrcodeVue from "qrcode.vue";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import db from "../../firebaseInit.js";
export default {
  name: "settings",
  components: {
    Switches,
    QrcodeVue,
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
  data() {
    return {
      enabled: false,
      newPassword: "",
      repeatnewPassword: "",
      currentPassword: "",
      displayName: "",
      email: "",
      photoURL: "",
      emailVerified: "",
      uid: "",
      error: false,
      errorMessage: "",
      successMessage: "",
      success: false,
      search: "",
      searchedUser: [],
      scores: [],
      size: 100,
      result: ""
    };
  },
  watch: {
    enabled() {
      db.collection("users")
        .doc(this.uid)
        .update({
          private: this.enabled
        });
    }
  },
  created() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, emailVerified;
    const uid = user.uid;
    var docRef = db.collection("score-data").doc(uid);
    var docRefUser = db.collection("users").doc(uid);
    docRef.get().then(doc => {
      if (doc.exists) {
        this.scores = doc.data().data;
      } else {
        console.log("You have no score");
      }
    });
    docRefUser.get().then(doc => {
      if (doc.exists) {
        this.enabled = doc.data().private;
      } else {
        console.log("No such document!");
      }
    });
    if (user != null) {
      this.displayName = user.displayName;
      this.email = user.email;
      this.photoURL = user.photoURL;
      this.emailVerified = user.emailVerified;
      this.uid = uid;
    }
    if (this.displayName == null) {
      this.displayName = "";
    }
  },
  methods: {
    CreatenewPassword() {
      this.reAuth().catch(e => {
        this.error = true;
        this.errorMessage = e;
      });
      if (this.newPassword != this.repeatnewPassword) {
        this.errorMessage = "Passwords don't match";
        this.error = true;
      } else {
        var user = firebase.auth().currentUser;
        var newPassword = this.newPassword;

        user
          .updatePassword(newPassword)
          .then(() => {
            this.successMessage = "Upadated password successfully";
            this.success = true;
            this.newPassword = "";
            this.repeatnewPassword = "";
          })
          .then(() => {
            this.newPassword = "";
            this.currentPassword = "";
            this.repeatnewPassword = "";
          })
          .catch(e => {
            this.error = true;
            this.errorMessage = e;
          });
      }
    },
    updateUser() {
      var user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: this.displayName,
          photoURL: this.photoURL,
          private: this.enabled
        })
        .then(() => {
          success = true;
        })
        .catch(e => {
          this.errorMessage = e;
        });
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
          console.log("success");
        })
        .catch(error => {
          // An error happened.
          this.error = true;
          this.errorMessage = error.message;
          this.newPassword = "";
          this.currentPassword = "";
          this.repeatnewPassword = "";
        });
    },
    searchUser(scan) {
      if (scan) {
        var docRef = db.collection("users").doc(scan);
        docRef
          .get()
          .then(doc => {
            if (doc.exists) {
              if (doc.data().private == false) {
                this.searchedUser = doc.data();
              } else {
                this.error = true;
                this.errorMessage = "User has a private account";
              }
            } else {
              console.log("no such user");
            }
          })
          .then(() => {
            this.search = "";
          });
      } else {
        var docRef = db.collection("users").doc(this.search);
        docRef
          .get()
          .then(doc => {
            if (doc.exists) {
              if (doc.data().private == false) {
                this.searchedUser = doc.data();
              } else {
                this.error = true;
                this.errorMessage = "User has a private account";
              }
            } else {
              console.log("no such user");
            }
          })
          .then(() => {
            this.search = "";
          });
      }
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
    onDecode(result) {
      this.result = result;
      this.searchUser(result);
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.errorMessage =
            "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.errorMessage = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.errorMessage =
            "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.errorMessage = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.errorMessage =
            "ERROR: Stream API is not supported in this browser";
        }
      }
    }
  }
};
</script>

<style>
.error {
  font-weight: bold;
  color: red;
}
</style>
