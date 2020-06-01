<template>
  <v-dialog
    v-model="dialog"
    max-width="400px">
    <template v-slot:activator="{on}">
      <v-btn
        flat slot="activator"
        text
        v-on="on">
        <v-icon>add</v-icon>
        <span overline class="caption">새로 만들기</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <p class="title font-weight-light">폴더</p>
      </v-card-title>
      <v-form class="px-3" @submit.prevent="uploadFolder">
        <v-card-text>
          <v-text-field
            outlined
            label="폴더 이름"
            v-model="folderName"
            color="blue"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            depressed
            class="mr-3 mb-3 text-lowercase font-weight-light"
            type="submit"
            @click="dialog = false">
            만들기
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  import moment from 'moment';

  export default {
    name: "CreateFolderFormComponent",
    data() {
      return {
        valid: false,
        folderName: '',
        folderPath: '/',
        dialog: false,
      }
    },
    methods: {
      async uploadFolder() {
        try {
          var now = Date.now();
          now = moment(now).format("YYYY-MM-DD");
          // const folder = new FormData();
          // formData.append('name', this.folderName);
          // formData.append('owner', 'owner');
          // formData.append('path', this.folderPath);
          // formData.append('isFolder', true);
          // formData.append('createdAt', now);
          // formData.append('fileSize', 0);
          // formData.append('share', false);

          const file = {
            'name': this.folderName,
            'owner': 'Tester',
            'path': this.folderPath,
            'isFolder': true,
            'modifiedDate': now,
            'fileSize': 0,
            'share': false
          };

          console.log("TEST", now, this.folderPath, this.folderName);

          await this.$store.dispatch('file/uploadFolder', {file});
          this.dialog = false;
          // await this.$store.dispatch('file/uploadFolder', {formData});
          await this.$router.push('/drive/file');
        } catch (e) {
          console.error(e);
        }
      },

    }
  }
</script>

<style scoped>

</style>
