<template>
  <b-container>
    <div v-if="cardTitle != ''" class="justify-content-md-center">
      <b-card>
        <h5 class="card-title">{{cardTitle}}</h5>
        <p class="card-text">{{cardContent}}</p>
      </b-card>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "InfoCard",
  props: ["cardTitle", "cardContent"]
};
</script>

<style>
.card {
  background-image: linear-gradient(135deg, #d6eeff 10%, #0396ff 100%);
  border: none;
}
</style>

