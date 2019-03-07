<template>
  <div>
    <br>
    <Graph/>
  </div>
</template>

<script>
import Graph from "./Graph.vue";
import db from "../../firebaseInit.js";
import firebase from "firebase";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Graph: Graph
  },
  created() {},
  methods: {}
};
</script>
