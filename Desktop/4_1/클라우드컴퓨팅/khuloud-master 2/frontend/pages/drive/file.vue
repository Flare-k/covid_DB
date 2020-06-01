<template>
  <div>
    <file-navbar-component/>
    <data-table-component/>
  </div>
</template>

<script>
  import FileNavbarComponent from "../../components/FileNavbarComponent";
  import DataTableComponent from "../../components/DataTableComponent";

  export default {
    name: "file",
    components: {
      FileNavbarComponent,
      DataTableComponent,
    }
  }
</script>

<style scoped>

</style>
