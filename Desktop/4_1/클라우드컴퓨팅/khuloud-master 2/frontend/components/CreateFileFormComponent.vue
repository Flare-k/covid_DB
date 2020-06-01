<template>
  <div>
    <v-btn
      text
      @click="$refs.fileInput.click()">
      <v-icon>vertical_align_top</v-icon>
      <span class="caption">업로드</span>
    </v-btn>
    <input
      v-show="false"
      type="file"
      ref="fileInput"
      multiple="multiple"
      @change="uploadFile">
  </div>
</template>

<script>
  import 'material-design-icons-iconfont/dist/material-design-icons.css'
  import moment from 'moment';

  export default {
    name: "CreateFileFormComponent",
    data() {
      return {
        filepath: '',
      }
    },
    methods: {
      async uploadFile(e) {
        try {
          const formData = new FormData();
          var now = Date.now();
          now = moment(now).format('YYYY-MM-DD');
          Array.prototype.forEach.call(e.target.files, (file) => {
            formData.append('file', file);
            formData.append('name', file.name);
            formData.append('isFolder', true);
            formData.append('path', this.filepath);
            formData.append('fileSize', file.size);
            formData.append('createdDate', now);
            formData.append('modifiedDate', now);
            formData.append('share', false);
            console.log(file);
          });

          await this.$store.dispatch('file/uploadFiles', {formData});
          // return this.$router.replace('/');
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
</script>

<style scoped>

</style>
