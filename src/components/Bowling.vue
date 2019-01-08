<template>
  <div>
    <b-alert
      v-if="success == true"
      dismissible
      variant="success"
      @dismissed="success=false"
      show
    >Saved Successfully</b-alert>
    <b-alert variant="danger" dismissible :show="error" @dismissed="error=false">{{errorMessage}}</b-alert>
    <b-container>
      <b-card class="spacer" bg-variant="dark" text-variant="white" title="Bowling">
        <p class="card-text">You can either add a detailed score or a basic one.</p>
        <b-button v-b-modal.detail variant="primary">Detailed</b-button>
        <b-button v-b-modal.basic variant="primary">Basic</b-button>
      </b-card>
      <b-modal id="detail" title="Detailed"></b-modal>
      <b-modal id="basic" title="Basic" @ok="addBasicScore">
        <b-form>
          <b-form-input
            class="spacer"
            v-model="basicScore"
            type="number"
            placeholder="Enter your score"
          ></b-form-input>
          <b-form-file
            accept="image/jpeg, image/png"
            v-model="file"
            :state="Boolean(file)"
            placeholder="Choose a file..."
          ></b-form-file>
          <div class="mt-3">Selected file: {{file && file.name}}</div>
        </b-form>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import db from "../../firebaseInit.js";
import firebase from "firebase";
export default {
  data() {
    return {
      basicScore: "",
      file: null,
      error: false,
      errorMessage: "",
      success: false
    };
  },
  methods: {
    addBasicScore() {
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      var d = new Date();
      var userCheck = db.collection(uid);
      var formatedD = d.toLocaleDateString("en-US");
      console.log(formatedD);

      if (this.basicScore == "") {
        this.Error("You must enter a score");
      } else if (!db.collection(uid).doc("data")) {
        this.basicScore = Number(this.basicScore);
        db.collection(uid)
          .doc("data")
          .set({
            data: [
              {
                y: this.basicScore,
                x: formatedD
              }
            ]
          })
          .then(() => {
            this.success = true;
          });
      } else {
        this.basicScore = Number(this.basicScore);
        var addScore = db.collection(uid).doc("data");

        addScore
          .update({
            data: firebase.firestore.FieldValue.arrayUnion({
              y: this.basicScore,
              x: formatedD
            })
          })
          .then(() => {
            this.success = true;
          });
      }
    },
    Error(e) {
      this.errorMessage = e;
      this.error = true;
    }
  }
};
</script>

<style scoped>
.spacer {
  margin-top: 2vh;
  margin-bottom: 2vh;
}
</style>
