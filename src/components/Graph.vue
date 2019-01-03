<template>
  <div v-if="series[0].data != 0">
    <apexchart type="area" :options="options" :series="series"></apexchart>
  </div>
</template>


<script>
import db from "../../firebaseInit.js";
import firebase from "firebase";
export default {
  name: "Graph",
  data() {
    return {
      options: {
        chart: {
          id: "Bowling Scores",
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true
            },
            autoSelected: "zoom"
          },
          animations: {
            initialAnimation: {
              enabled: false
            }
          },
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
          type: "datetime"
        }
      },
      series: [
        {
          name: "Series 1",
          data: [
            {
              x: "02-10-2017",
              y: 34
            },
            {
              x: "02-11-2017",
              y: 43
            },
            {
              x: "02/12/2017",
              y: 31
            },
            {
              x: "02/13/2017",
              y: 43
            },
            {
              x: "02-14-2017",
              y: 33
            },
            {
              x: "02-15-2017",
              y: 52
            }
          ]
        }
      ],
      tempDate: [],
      tempScore: []
    };
  },
  created() {
    // {  },
    //           { y: doc.data().Scores }
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    var docRef = db.collection(uid).doc("Bgq0giMVQuLRHmntPrvC");
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log(doc.data().Dates);
          doc.data().Dates.forEach(element => {
            this.tempDate.push({ x: element });
          });
          doc.data().Scores.forEach(element => {
            this.tempScore.push({ y: element });
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  }
};
</script>
