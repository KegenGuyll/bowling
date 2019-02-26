<template>
  <div class="justify-content-md-center">
    <b-container>
      <br>
      <b-card no-body>
        <b-tabs pills card>
          <b-tab title="Account" active>
            <b-list-group flush>
              <transition name="slide">
                <b-list-group-item :to="{name:'profile',params:{UserData}}">Profile</b-list-group-item>
              </transition>
              <b-list-group-item :to="{name:'password',params:{UserData}}">Password</b-list-group-item>
              <b-list-group-item :to="{name:'score',params:{UserData}}">Scores</b-list-group-item>
              <b-list-group-item :to="{name: 'friend', params:{UserData}}">Friends</b-list-group-item>
              <b-list-group-item>Private Account
                <switches
                  style="float: right; margin-top:8px"
                  theme="bootstrap"
                  color="primary"
                  v-model="enabled"
                ></switches>
              </b-list-group-item>
              <b-list-group-item href="#">Delete Account</b-list-group-item>
              <b-list-group-item href="#" v-on:click="logout()">Logout</b-list-group-item>
            </b-list-group>
          </b-tab>
        </b-tabs>
      </b-card>
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
      size: 100,
      UserData: {
        displayName: "",
        email: "",
        photoUrl: "",
        uid: ""
      }
    };
  },
  created() {
    const user = firebase.auth().currentUser;

    if (user != null) {
      this.UserData.displayName = user.displayName;
      this.UserData.email = user.email;
      this.UserData.photoUrl = user.photoURL;
      this.UserData.uid = user.uid;
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
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
