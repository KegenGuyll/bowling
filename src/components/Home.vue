<template>
  <div>
    <InfoCard :cardTitle="cardTitle" :cardContent="cardContent" class="spacer"></InfoCard>
    <Graph class="spacer"></Graph>
  </div>
</template>

<script>
import InfoCard from "./InfoCard";
import Graph from "./Graph.vue";
import backarrow from "../components/Settings_group/Backarrow";
import db from "../../firebaseInit.js";
import firebase from "firebase";
export default {
  name: "Home",
  data() {
    return {
      cardTitle: "",
      cardContent: ""
    };
  },
  components: {
    Graph: Graph,
    InfoCard: InfoCard,
    backarrow
  },
  created() {},
  methods: {}
};
</script>

<style>
.spacer {
  margin-top: 2vh;
  margin-bottom: 2vh;
}
</style>
