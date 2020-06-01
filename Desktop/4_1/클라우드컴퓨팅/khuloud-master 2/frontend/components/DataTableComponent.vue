<template>
  <v-layout justify-center="center" class="my-10">
    <v-flex
      xs12 md10>
      <v-data-table
        :headers="headers"
        :items="files"
        hide-actions
        hide-default-footer
        show-select
      >
        <template slot="items" slot-scope="props">
          <td>
            <v-btn
              icon>
              <v-icon>folder</v-icon>
            </v-btn>
          </td>
          <td>
            {{ props.item.name }}
          </td>
          <td class="text-xs-right">{{ props.item.modifiedDate }}</td>
          <td class="text-xs-right">{{ props.item.owner }}</td>
          <td class="text-xs-right">{{ props.item.fileSize }}</td>
          <td class="text-xs-right">{{ props.item.share }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
  import 'material-design-icons-iconfont/dist/material-design-icons.css'

  export default {
    name: 'DataTableComponent',
    computed: {
      files() {
        return this.$store.state.file.files
      }
    },
    data() {
      return {
        currentPath: 'root',
        fileTypeIcon: '',
        headers: [
          {text: '', value: 'icon'},
          {
            text: '이름',
            align: 'left',
            sortable: 'false',
            value: 'name'
          },
          {text: '수정한 날짜', value: 'modifiedDate'},
          {text: '수정한 사람', value: 'owner'},
          {text: '파일 크기', value: 'fileSize'},
          {text: '공유', value: 'share'}
        ],
      }
    }
  }
</script>
