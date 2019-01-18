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
              <b-list-group-item href="#" v-b-modal.displayName>Profile</b-list-group-item>
              <b-list-group-item href="#" v-b-modal.Password>Password</b-list-group-item>
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
        <b-modal centered @ok="updateUser" id="displayName" title="Update Profile">
          <b-form>
            <b-list-group>
              <b-list-group-item>
                <div style="display: flex;flex-direction: column;">
                  <div style="display: flex; flex-direction: row; justify-content: space-between;">
                    <h6 class="float-left">Display Name: {{displayName}}</h6>
                    <b-img
                      class="float-right"
                      v-b-toggle.collapse1
                      src="https://img.icons8.com/ios-glyphs/30/000000/pencil.png"
                    ></b-img>
                  </div>
                </div>
                <b-collapse id="collapse1">
                  <b-form-input type="text" placeholder="Display Name" v-model="displayName"></b-form-input>
                </b-collapse>
              </b-list-group-item>
              <b-list-group-item>
                <div style="display: flex;flex-direction: column;">
                  <div style="display: flex; flex-direction: row; justify-content: space-between;">
                    <h6 class="float-left">PhotoUrl ...</h6>
                    <b-img
                      class="float-right"
                      v-b-toggle.collapse2
                      src="https://img.icons8.com/ios-glyphs/30/000000/pencil.png"
                    ></b-img>
                  </div>
                </div>
                <b-collapse id="collapse2">
                  <b-form-input type="text" placeholder="Photo Url" v-model="photoURL"></b-form-input>
                </b-collapse>
              </b-list-group-item>
              <b-list-group-item v-b-toggle.collapse3>
                <h6>UID ...</h6>
                <b-collapse id="collapse3">
                  <div style="display: flex;flex-direction: column;">
                    <div
                      style="display: flex; flex-direction: row; justify-content: space-between;"
                    >
                      <b-form-input
                        class="float-left"
                        disabled
                        type="text"
                        placeholder="UID"
                        v-model="uid"
                      ></b-form-input>
                    </div>
                  </div>
                </b-collapse>
              </b-list-group-item>
            </b-list-group>
          </b-form>
        </b-modal>
        <b-modal centered id="friends">
          <b-form>
            <b-form-input type="text" placeholder="Seach by UID" v-model="search"></b-form-input>
            <div style="display: flex;flex-direction: row;">
              <div style="display: flex; flex-direction: row; justify-content: space-between;">
                <b-button v-if="search != ''" class="float-right" v-on:click="searchUser">Search</b-button>
              </div>
            </div>
          </b-form>
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
      </div>
    </b-container>
  </div>
</template>


<script>
import Switches from "vue-switches";
import firebase from "firebase";
import db from "../../firebaseInit.js";
export default {
  name: "settings",
  components: {
    Switches
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
      scores: []
    };
  },
  created() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, emailVerified;
    const uid = user.uid;
    var docRef = db.collection("score-data").doc(uid);
    docRef.get().then(doc => {
      if (doc.exists) {
        this.scores = doc.data().data;
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
          photoURL: this.photoURL
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
    searchUser() {
      var docRef = db.collection("users").doc(this.search);

      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            this.searchedUser = doc.data();
          } else {
            console.log("no such user");
          }
        })
        .then(() => {
          this.search = "";
        });
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
    }
  }
};
</script>

<style>
.spacer {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>

<style>
.bottom-input {
  border-top-color: unset;
  border-top-style: unset;
  border-top-width: unset;
  border-right-color: unset;
  border-right-style: unset;
  border-right-width: unset;
  border-bottom-color: #ced4da;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-left-color: unset;
  border-left-style: unset;
  border-left-width: unset;
}
.form-control:focus {
  color: #212121;
  border-color: #ced4da;
  outline: unset;
  box-shadow: unset;
}
</style>