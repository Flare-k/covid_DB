<template>
  <div>
    <file-navbar-component/>
    <share-table-component/>
  </div>
</template>

<script>
  import FileNavbarComponent from "../../components/FileNavbarComponent";
  import ShareTableComponent from "../../components/ShareTableComponent";

  export default {
    name: "shared-with-me.vue",
    components: {FileNavbarComponent, ShareTableComponent},
  }
</script>

<style scoped>

</style>
