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
      <b-card v-if="show != ''">
        <b-media vertical-align="center">
          <h5 class="mt-0 mb-1">{{show.name}}</h5>
          <b-list-group>
            <b-list-group-item href="#">Email - {{show.email}}</b-list-group-item>
            <b-list-group-item href="#">Total Scores - {{show.totalScore}}</b-list-group-item>
            <b-list-group-item href="#">Average - {{show.average}}</b-list-group-item>
            <b-list-group-item href="#">High - {{show.high}}</b-list-group-item>
            <b-list-group-item href="#">Low - {{show.low}}</b-list-group-item>
          </b-list-group>
        </b-media>
        <br>
        <b-button variant="outline-success">Add Friend</b-button>
      </b-card>
    </b-container>
  </div>
</template>


<script>
import backarrow from "./Backarrow.vue";
import db from "../../../firebaseInit.js";

export default {
  name: "friends",
  data() {
    return {
      search: "",
      users: [],
      show: "",
      showAll: false
    };
  },
  components: {
    backarrow
  },
  created() {
    var docRef = db.collection("users");

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

      //const result = this.users.filter(word => word === text);
    },
    sort(nameKey, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
          return myArray[i];
        }
      }
    }
  }
};
</script>
