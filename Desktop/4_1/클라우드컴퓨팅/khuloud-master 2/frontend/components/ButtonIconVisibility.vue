<template>
  <div>
    <v-btn class="pink white--text">click me</v-btn>
    <v-btn depressed class="pink">click me</v-btn>
    <v-btn flat class="pink">click me</v-btn>

    <v-btn depressed class="pink white--text">
      <v-icon left>email</v-icon>
      <span>email me</span>
    </v-btn>

    <v-btn depressed small class="pink white--text">
      <v-icon left small>email</v-icon>
      <span>email me</span>
    </v-btn>

    <v-btn fab small dark class="purple">
      <v-icon>favorite</v-icon>
    </v-btn>


  <h1>HomePage</h1>
    <v-btn class="hidden-md-and-down">click me</v-btn>
    <v-btn class="hidden-md-and-up">click me</v-btn>
    <v-btn class="hidden-sm-only">click me</v-btn>

  </div>
</template>

<script>
  export default {
    name: "ButtonIconVisibility"
  }
</script>

<style scoped>

</style>
