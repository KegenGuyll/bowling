<template>
  <div>
    <backarrow/>
    <br>
    <b-container>
      <b-input-group>
        <b-form-input type="text" placeholder="Username" v-model="search"></b-form-input>
        <b-input-group-append>
          <b-btn
            v-bind:disabled="search === ''"
            variant="success"
            v-on:click="searchUser(search)"
          >Search</b-btn>
        </b-input-group-append>
      </b-input-group>
      <br>
      <div v-if="showAll === true">
        <b-list-group-item
          v-for="profile in users"
          v-bind:key="profile.uid"
          v-b-toggle="profile.uid"
          href="#"
        >
          {{profile.name}}
          <b-collapse v-bind:id="profile.uid">
            <b-card>{{profile.name}}</b-card>
          </b-collapse>
        </b-list-group-item>
      </div>
      <b-card class="black bottomBorder" v-if="show != ''">
        <b-media vertical-align="center">
          <h5 class="mt-0 mb-1">{{show.name}}</h5>
          <b-list-group>
            <b-list-group-item class="black" href="#">Email - {{show.email}}</b-list-group-item>
            <b-list-group-item class="black" href="#">Total Scores - {{show.totalScore}}</b-list-group-item>
            <b-list-group-item class="black" href="#">Average - {{show.average}}</b-list-group-item>
            <b-list-group-item class="black" href="#">High - {{show.high}}</b-list-group-item>
            <b-list-group-item class="black" href="#">Low - {{show.low}}</b-list-group-item>
          </b-list-group>
        </b-media>
        <br>
        <b-button
          v-bind:disabled="alreadyFriend"
          variant="outline-success"
          v-on:click="addFriend(show.uid)"
        >Add Friend</b-button>
      </b-card>
    </b-container>
  </div>
</template>


<script>
import backarrow from "./Backarrow.vue";
import db from "../../../firebaseInit.js";
import firebase from "firebase";

export default {
  name: "friends",
  data() {
    return {
      search: "",
      users: [],
      show: "",
      showAll: false,
      UserUid: "",
      displayName: "",
      email: "",
      photoUrl: "",
      alreadyFriend: false,
      friends: []
    };
  },
  components: {
    backarrow
  },
  created() {
    if (!this.$route.params.UserData) {
      const user = firebase.auth().currentUser;

      if (user != null) {
        this.displayName = user.displayName;
        this.email = user.email;
        this.photoUrl = user.photoURL;
        this.Useruid = user.uid;
        this.searchFriend(user.uid);
      }
    } else {
      this.User();
    }
    const docRef = db.collection("users");
    docRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.users.push(doc.data());
      });
    });
  },
  methods: {
    searchUser(text) {
      if (text === ":all") {
        this.showAll = true;
      } else {
        const resultObject = this.sort(text, this.users);
        this.show = resultObject;
        this.showAll = false;
      }
    },
    sort(nameKey, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
          return myArray[i];
        }
      }
    },
    addFriend(uid) {
      db.collection("users")
        .doc(this.Useruid)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion(uid)
        });
    },
    User() {
      this.displayName = this.$route.params.UserData.displayName;
      this.email = this.$route.params.UserData.email;
      this.photoUrl = this.$route.params.UserData.photoUrl;
      this.Useruid = this.$route.params.UserData.uid;
      this.searchFriend(this.$route.params.UserData.uid);
    },
    searchFriend(uid) {
      const docRef = db.collection("users").doc(uid);
      docRef.get().then(doc => {
        if (doc.exists) {
          this.friends = doc.data().friends;
        }
      });
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
  text-align: center;
}

.list-group-item-action:hover {
  background-color: #3b3b3d;
  color: #ffffff;
  text-align: center;
}
</style>
