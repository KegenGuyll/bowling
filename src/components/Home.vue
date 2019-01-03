<template>
  <div>
    <Graph class="spacer"></Graph>
  </div>
</template>

<script>
import Graph from "./Graph.vue";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Graph: Graph
  }
};
</script>

<style>
.spacer {
  margin-top: 2vh;
  margin-bottom: 2vh;
}
</style>
