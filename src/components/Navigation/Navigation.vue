<template>
  <div>
    <b-alert
      v-if="success == true"
      dismissible
      variant="success"
      @dismissed="success=false"
      show
    >Saved Successfully</b-alert>
    <b-navbar class="ml-auto" type="dark" fixed="bottom">
      <router-link to="/">
        <div style="padding-left: 30px; padding-top: 10px;">
          <div v-if="this.$route.path === '/'" class="bottomBorderDashboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="35"
              height="35"
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
                <g fill="#cccccc">
                  <path
                    d="M149.492,143.612l-36.69867,-36.708l-46.872,46.872l-19.25467,-19.24533v-26.39467l19.25467,19.25467l46.872,-46.872l36.69867,36.708l46.508,-46.51733v-36.456l-46.66667,46.66667l-34.02933,-34.02933l-47.67467,47.67467l-20.96267,-20.96267v-45.60267h-18.66667v149.33333c0,10.29467 8.372,18.66667 18.66667,18.66667h149.33333v-93.33333v-5.56267z"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <div v-if="this.$route.path !== '/'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="35"
              height="35"
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
                <g fill="#cccccc">
                  <path
                    d="M149.492,143.612l-36.69867,-36.708l-46.872,46.872l-19.25467,-19.24533v-26.39467l19.25467,19.25467l46.872,-46.872l36.69867,36.708l46.508,-46.51733v-36.456l-46.66667,46.66667l-34.02933,-34.02933l-47.67467,47.67467l-20.96267,-20.96267v-45.60267h-18.66667v149.33333c0,10.29467 8.372,18.66667 18.66667,18.66667h149.33333v-93.33333v-5.56267z"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </router-link>
      <div v-b-modal.basic style="padding-top: 10px;">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="35"
          height="35"
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
            <g fill="#cccccc">
              <path
                d="M111.78125,22.19583c-8.2417,0.12078 -14.82732,6.89568 -14.71458,15.1375v59.73333h-59.73333c-5.3855,-0.07616 -10.39482,2.75334 -13.10979,7.40503c-2.71497,4.6517 -2.71497,10.4049 0,15.0566c2.71497,4.6517 7.72429,7.4812 13.10979,7.40503h59.73333v59.73333c-0.07616,5.3855 2.75334,10.39482 7.40503,13.10979c4.6517,2.71497 10.4049,2.71497 15.0566,0c4.6517,-2.71497 7.4812,-7.72429 7.40503,-13.10979v-59.73333h59.73333c5.3855,0.07616 10.39482,-2.75334 13.10979,-7.40503c2.71497,-4.6517 2.71497,-10.4049 0,-15.0566c-2.71497,-4.6517 -7.72429,-7.4812 -13.10979,-7.40503h-59.73333v-59.73333c0.05518,-4.03392 -1.52395,-7.91857 -4.378,-10.76988c-2.85405,-2.8513 -6.74022,-4.42669 -10.77409,-4.36763z"
              ></path>
            </g>
          </g>
        </svg>
      </div>
      <router-link to="/settings">
        <div style="padding-right: 30px; padding-top: 10px;">
          <div class="bottomBorderDashboard" v-if="this.$route.path.includes('/settings')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="35"
              height="35"
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
                <g fill="#cccccc">
                  <path
                    d="M112,28c-20.61863,0 -37.33333,16.7147 -37.33333,37.33333c0,20.61863 16.7147,37.33333 37.33333,37.33333c20.61863,0 37.33333,-16.7147 37.33333,-37.33333c0,-20.61863 -16.7147,-37.33333 -37.33333,-37.33333zM112,130.66667c-28.03733,0 -84,14.07467 -84,42v23.33333h168v-23.33333c0,-27.92533 -55.96267,-42 -84,-42z"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <div v-if="!this.$route.path.includes('/settings')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="35"
              height="35"
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
                <g fill="#cccccc">
                  <path
                    d="M112,28c-20.61863,0 -37.33333,16.7147 -37.33333,37.33333c0,20.61863 16.7147,37.33333 37.33333,37.33333c20.61863,0 37.33333,-16.7147 37.33333,-37.33333c0,-20.61863 -16.7147,-37.33333 -37.33333,-37.33333zM112,130.66667c-28.03733,0 -84,14.07467 -84,42v23.33333h168v-23.33333c0,-27.92533 -55.96267,-42 -84,-42z"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </router-link>
    </b-navbar>
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
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../../../firebaseInit.js";
export default {
  name: "Navigation",
  data() {
    return {
      temp: "",
      basicScore: "",
      success: false
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
        if (this.basicScore <= 300 && this.basicScore > 0) {
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
                this.basicScore = "";
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
                this.basicScore = "";
              });
          }
        } else {
          this.error = true;
          this.errorMessage = "You have entered a invaild number";
          this.basicScore = "";
        }
      });
    }
  }
};
</script>


<style scoped>
.navbar {
  background-color: black;
}
.bottomBorderDashboard {
  border-bottom: 5px solid #ff0099;
  border-radius: 5px;
}
.modal-content {
  background-color: #212121 !important;
}
.modal-header {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: start;
  align-items: flex-start;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: unset;
  border-top-left-radius: unset;
  border-top-right-radius: unset;
  color: white;
}
.modal-footer {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 1rem;
  border-top: unset;
  border-bottom-right-radius: unset;
  border-bottom-left-radius: unset;
}
</style>
