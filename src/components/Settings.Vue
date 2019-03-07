<template>
  <div class="justify-content-md-center">
    <b-container>
      <br>
      <b-card class="black bottomBorder" no-body>
        <b-tabs pills card>
          <b-tab title="Account" active>
            <b-list-group flush>
              <b-list-group-item class="black" :to="{name:'profile',params:{UserData}}">Profile</b-list-group-item>
              <b-list-group-item class="black" :to="{name:'password',params:{UserData}}">Password</b-list-group-item>
              <b-list-group-item class="black" :to="{name:'score',params:{UserData}}">Scores</b-list-group-item>
              <b-list-group-item class="black" :to="{name: 'friend', params:{UserData}}">Friends</b-list-group-item>
              <b-list-group-item class="black">Private Account
                <switches
                  style="float: right; margin-top:8px"
                  theme="bootstrap"
                  color="primary"
                  v-model="enabled"
                ></switches>
              </b-list-group-item>
              <b-list-group-item class="black" href="#">Delete Account</b-list-group-item>
              <b-list-group-item class="black" href="#" v-on:click="logout()">Logout</b-list-group-item>
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

<style scoped>
.error {
  font-weight: bold;
  color: red;
}

.bottomBorder {
  border-bottom: 5px solid #007bff;
  border-radius: 5px;
}

.black {
  background-color: #2a2a2c;
  color: #ffffff;
}
</style>
