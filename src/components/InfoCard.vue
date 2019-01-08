<template>
  <b-container>
    <b-row>
      <div v-if="cardTitle != ''" class="justify-content-md-center">
        <b-col cols="12" md="8">
          <b-card>
            <h5 class="card-title">{{cardTitle}}</h5>
            <p class="card-text">{{cardContent}}</p>
          </b-card>
        </b-col>
        <b-col cols="6" md="4">
          <b-card>
            <h5 class="card-title">{{cardTitle}}</h5>
            <p class="card-text">{{cardContent}}</p>
          </b-card>
        </b-col>
      </div>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: "InfoCard",
  props: ["cardTitle", "cardContent"]
};
</script>

<style scoped>
.card {
  background-image: linear-gradient(135deg, #d6eeff 10%, #008ffb 100%);
  border: none;
}
</style>

