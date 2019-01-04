<template>
  <div>
    <InfoCard :cardTitle="cardTitle" :cardContent="cardContent" class="spacer"></InfoCard>
    <Graph class="spacer"></Graph>
  </div>
</template>

<script>
import InfoCard from "./InfoCard";
import Graph from "./Graph.vue";
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
    InfoCard: InfoCard
  },
  methods: {
    createCard(option) {
      if (option == "strike") {
      }
      if (option == "pins hit") {
      }
    }
  }
};
</script>

<style>
.spacer {
  margin-top: 2vh;
  margin-bottom: 2vh;
}
</style>
