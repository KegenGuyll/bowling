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
        style="background-color:rgb(62, 106, 255);"
        class="spacer text-center"
        bg-variant="dark"
        text-variant="white"
        title="Remove Score"
      >
        <b-button
          style="width:100%; background-color: #FF4400; border-color:#FF4400;"
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
      </b-card>
      <b-modal id="remove" centered title="Remove">
        <b-card
          title="Remove Score"
          bg-variant="dark"
          text-variant="white"
          v-for="(scores, index) in data"
          v-bind:key="index"
        >
          <h5>{{scores.y}}</h5>
          <h6>{{scores.x}}</h6>
          {{scores.contentID}}
          <b-button
            v-on:click="remove(index,scores)"
            style="width:100%; background-color: rgb(204, 12, 12); border-color:rgb(204, 12, 12);"
            v-b-modal.remove
          >
            <h6>Delete</h6>
          </b-button>
        </b-card>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import db from "../../firebaseInit.js";
import firebase from "firebase";
export default {
  name: "RemoveScore",
  props: ["data"],
  data() {
    return {
      basicScore: "",
      file: null,
      error: false,
      errorMessage: "",
      success: false
    };
  },
  created() {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
  },
  methods: {
    Error(e) {
      this.errorMessage = e;
      this.error = true;
    },
    update() {
      this.$parent.update();
    },
    remove(index, scores) {
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      db.collection(uid)
        .where("datcontentID", "==", scores.contentID)
        .get()
        .then(querySnapshot => {
          console.log(querySnapshot);
          querySnapshot.forEach(doc => {
            doc.ref.delete();
            this.data.splice(index, 1);
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
.spacer {
  margin-top: 2vh;
  margin-bottom: 2vh;
}

.text-center {
  text-align: center;
}

.btn-secondary {
  color: unset;
  background-color: unset;
  border-color: unset;
}
</style>
