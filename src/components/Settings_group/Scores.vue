<template>
  <div>
    <backarrow/>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <b-alert
      v-if="success == true"
      dismissible
      variant="success"
      @dismissed="success=false"
      show
    >{{successMessage}}</b-alert>
    <br>
    <b-alert variant="danger" dismissible :show="error" @dismissed="error=false">{{errorMessage}}</b-alert>
    <b-container>
      <b-list-group>
        <b-list-group-item
          v-for="score in scores"
          v-bind:key="score.contentID"
          href="#"
          class="d-flex justify-content-between align-items-center"
        >
          {{score.y}}
          <b-badge variant="primary" pill>{{score.x}}</b-badge>
        </b-list-group-item>
      </b-list-group>
    </b-container>
  </div>
</template>

<script>
import backarrow from "./Backarrow";
import Loading from "vue-loading-overlay";

import firebase from "firebase";
import db from "../../../firebaseInit.js";

export default {
  name: "scores",
  components: {
    backarrow,
    Loading
  },
  data() {
    return {
      scores: [],
      uid: "",
      isLoading: false,
      fullPage: true,
      success: false,
      successMessage: "",
      error: false,
      errorMessage: ""
    };
  },
  created() {
    const user = firebase.auth().currentUser;
    this.uid = user.uid;

    this.isLoading = true;
    var docRef = db.collection("score-data").doc(this.uid);

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          this.scores = doc.data().data;
          this.successMethod(true, "All of you scores have been pulled");
          this.clear();
        } else {
          this.errorMethod(true, "You don't have any scores entered");
          this.clear();
        }
      })
      .then(() => {
        this.isLoading = false;
      });
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  },
  methods: {
    onCancel() {
      console.log("User cancelled the loader.");
    },
    clear() {
      setTimeout(() => {
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

