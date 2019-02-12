<template>
  <b-container>
    <b-row>
      <b-col>
        <Score/>
      </b-col>
    </b-row>
    <b-card style="background-color: #3e6aff;
    color: #fff;" title="Total Score">
      <h3 class="card-text">{{totalPin}}</h3>
    </b-card>
    <b-row>
      <b-col>
        <b-card
          style="background-color: #fff; color: #000000;"
          title="Chance of Strike"
          class="spacer"
        >
          <h5 class="card-text">{{strikes}}</h5>
        </b-card>
      </b-col>
      <b-col>
        <b-card
          style="background-color: #fff; color: #000000;"
          title="Average Score"
          class="spacer"
        >
          <h6>{{average}}</h6>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card title="High" style="background-color: #11d241;
    color: white;">
          <h5>{{high}}</h5>
        </b-card>
      </b-col>
      <b-col>
        <b-card title="Low" style="background-color: #f40;
    color: white;">
          <h5>{{low}}</h5>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card style="background-color: #fff;" class="spacer">
          <div>
            <apexchart type="area" :options="options" :series="series"></apexchart>
          </div>
        </b-card>
        <b-card style="background-color: #3e6aff;
    color: #fff;" class="spacer" title="User">
          <h5>{{user}}</h5>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <Remove :data="data"></Remove>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
import Score from "./addScore";
import Remove from "./removeScore";
import db from "../../firebaseInit.js";
import firebase from "firebase";
import VueApexCharts from "vue-apexcharts";
export default {
  name: "Graph",
  components: {
    Score,
    Remove
  },
  data() {
    return {
      data: [],
      high: "N/A",
      low: "N/A",
      scores: [],
      average: "N/A",
      strikes: "N/A",
      totalPin: "N/A",
      user: "N/A",
      name: "",
      email: "",
      photoUrl: "",
      UID: "",
      options: {
        chart: {
          id: "Bowling Scores",
          title: {
            text: "Bowling Scores",
            align: "left",
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize: "16px",
              color: "#263238"
            }
          }
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "1",
          data: []
        }
      ]
    };
  },
  created() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, UID, emailVerified;
    const uid = user.uid;
    if (user != null) {
      this.name = user.displayName;
      this.email = user.email;
      this.photoUrl = user.photoURL;
      this.UID = user.uid;
    }
    this.update();
  },
  methods: {
    getSum(total, num) {
      return total + num;
    },
    update() {
      const user = firebase.auth().currentUser;
      this.user = user.email;
      const uid = user.uid;
      var docRef = db.collection("score-data").doc(uid);
      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            this.series = [
              {
                name: "Series 1",
                data: doc.data().data
              }
            ];
            this.categories = [doc.data().data];
            this.data = doc.data().data;
          } else {
            console.log("No such document!");
          }
        })
        .then(() => {
          this.scores = [];
          this.data.forEach(element => {
            this.scores.push(element.y);
          });
        })
        .then(() => {
          this.high = Math.max.apply(null, this.scores);
          this.low = Math.min.apply(null, this.scores);
          this.totalPin = this.scores.reduce(this.getSum);
          this.average = Math.round(this.totalPin / this.scores.length);
        })
        .then(() => {
          db.collection("users")
            .doc(uid)
            .update({
              name: this.name,
              email: this.email,
              photoUrl: this.photoUrl,
              uid: this.UID,
              totalScore: this.totalPin,
              average: this.average,
              high: this.high,
              low: this.low
            });
        })
        .catch(error => {
          console.log("Error: ", error);
        });
    }
  }
};
</script>
