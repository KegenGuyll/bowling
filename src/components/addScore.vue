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
      <b-card
        style="background-color: rgb(62, 106, 255);"
        class="spacer text-center"
        bg-variant="dark"
        text-variant="white"
        title="Add Score"
      >
        <b-row>
          <b-button style="width:50%" v-b-modal.basic variant="primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
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
                  <path
                    d="M111.78125,22.19583c-8.2417,0.12078 -14.82732,6.89568 -14.71458,15.1375v59.73333h-59.73333c-5.3855,-0.07616 -10.39482,2.75334 -13.10979,7.40503c-2.71497,4.6517 -2.71497,10.4049 0,15.0566c2.71497,4.6517 7.72429,7.4812 13.10979,7.40503h59.73333v59.73333c-0.07616,5.3855 2.75334,10.39482 7.40503,13.10979c4.6517,2.71497 10.4049,2.71497 15.0566,0c4.6517,-2.71497 7.4812,-7.72429 7.40503,-13.10979v-59.73333h59.73333c5.3855,0.07616 10.39482,-2.75334 13.10979,-7.40503c2.71497,-4.6517 2.71497,-10.4049 0,-15.0566c-2.71497,-4.6517 -7.72429,-7.4812 -13.10979,-7.40503h-59.73333v-59.73333c0.05518,-4.03392 -1.52395,-7.91857 -4.378,-10.76988c-2.85405,-2.8513 -6.74022,-4.42669 -10.77409,-4.36763z"
                  ></path>
                </g>
              </g>
            </svg>
          </b-button>
          <b-button
            style="width:50%; background-color: #FF4400; border-color:#FF4400;"
            v-b-modal.remove
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
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
                  <path
                    d="M37.33333,97.06667c-5.3855,-0.07616 -10.39482,2.75334 -13.10979,7.40503c-2.71497,4.6517 -2.71497,10.4049 0,15.0566c2.71497,4.6517 7.72429,7.4812 13.10979,7.40503h149.33333c5.3855,0.07616 10.39482,-2.75334 13.10979,-7.40503c2.71497,-4.6517 2.71497,-10.4049 0,-15.0566c-2.71497,-4.6517 -7.72429,-7.4812 -13.10979,-7.40503z"
                  ></path>
                </g>
              </g>
            </svg>
          </b-button>
        </b-row>
      </b-card>
      <b-modal id="basic" centered title="Basic" @ok="addBasicScore">
        <b-form>
          <b-form-input
            class="spacer"
            v-model="basicScore"
            type="number"
            placeholder="Enter your score"
          ></b-form-input>
        </b-form>
      </b-modal>
    </b-container>
    <br>
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
      success: false,
      temp: ""
    };
  },
  created() {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
  },
  methods: {
    addBasicScore() {
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      var d = new Date();
      var formatedD = d.toLocaleDateString("en-US");

      var docRef = db.collection("score-data").doc(uid);

      docRef.get().then(doc => {
        if (this.basicScore < 300 && this.basicScore > 0) {
          if (doc.exists) {
            this.basicScore = Number(this.basicScore);
            var addScore = db.collection("score-data").doc(uid);
            this.temp = Math.floor(Math.random() * 1000000 + 1);
            addScore
              .update({
                data: firebase.firestore.FieldValue.arrayUnion({
                  y: this.basicScore,
                  x: formatedD,
                  contentID: this.temp
                })
              })
              .then(() => {
                this.success = true;
                this.update();
              });
          } else {
            this.basicScore = Number(this.basicScore);
            this.temp = Math.floor(Math.random() * 1000000 + 1);
            db.collection("score-data")
              .doc(uid)
              .set({
                data: [
                  {
                    y: this.basicScore,
                    x: formatedD,
                    contentID: this.temp
                  }
                ]
              })
              .then(() => {
                this.success = true;
                this.update();
              });
          }
        } else {
          this.error = true;
          this.errorMessage = "You have entered a invaild number";
          this.basicScore = "";
        }
      });
    },
    Error(e) {
      this.errorMessage = e;
      this.error = true;
    },
    update() {
      this.$parent.update();
    }
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
