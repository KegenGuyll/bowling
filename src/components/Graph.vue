<template>
  <b-container>
    <b-card style="color: #fff;" class="bottomBorderTotal black" title="Total Score">
      <h3 class="card-text">{{totalPin}}</h3>
    </b-card>
    <b-row>
      <b-col>
        <b-card style="color: #fff;" title="Average Score" class="bottomBorderAverage black spacer">
          <h3>{{average}}</h3>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card title="High" class="bottomBorderHigh black" style="color: white;">
          <h5>{{high}}</h5>
        </b-card>
      </b-col>
      <b-col>
        <b-card title="Low" class="bottomBorderLow black" style="color: white;">
          <h5>{{low}}</h5>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card style="color: #000000" class="bottomBorderGraph black spacer">
          <div>
            <apexchart type="area" :options="options" :series="series"></apexchart>
          </div>
        </b-card>
        <div style=" margin-top: 2vh; margin-bottom: 10vh;">
          <b-card style="color: #fff;" class="bottomBorderUser black" title="User">
            <h5>{{user}}</h5>
          </b-card>
        </div>
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
      name: "N/A",
      email: "N/A",
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
              color: "#fff"
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        grid: {
          row: {
            colors: ["#2a2a2c"]
          },
          column: {
            colors: ["#2a2a2c"]
          }
        },
        colors: ["#0190fb"],
        xaxis: {
          categories: [],
          labels: {
            show: true,
            style: {
              colors: "#fff",
              fontSize: "14px",
              fontFamily: "sans-serif"
            }
          }
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              color: "#fff",
              fontSize: "14px",
              fontFamily: "sans-serif"
            }
          }
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
          var docRef = db.collection("users").doc(uid);

          docRef.get().then(doc => {
            if (doc.exists) {
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
            } else {
              db.collection("users")
                .doc(uid)
                .set({
                  name: this.name,
                  email: this.email,
                  photoUrl: this.photoUrl,
                  uid: this.UID,
                  totalScore: this.totalPin,
                  average: this.average,
                  high: this.high,
                  low: this.low,
                  friends: []
                });
            }
          });
        })
        .catch(error => {
          console.log("Error: ", error);
        });
    }
  }
};
</script>

<style>
.spacer {
  margin: 15px 2px;
}

.bottomBorderHigh {
  border-bottom: 5px solid #11d241;
  border-radius: 5px;
}
.bottomBorderLow {
  border-bottom: 5px solid #f40;
  border-radius: 5px;
}
.bottomBorderTotal {
  border-bottom: 5px solid #6e0dd0;
  border-radius: 5px;
}
.bottomBorderUser {
  border-bottom: 5px solid #fd1c03;
  border-radius: 5px;
}
.bottomBorderAverage {
  border-bottom: 5px solid #f2ea02;
  border-radius: 5px;
}
.bottomBorderGraph {
  border-bottom: 5px solid #0190fb;
  border-radius: 5px;
}

.black {
  background-color: #2a2a2c;
}
</style>
