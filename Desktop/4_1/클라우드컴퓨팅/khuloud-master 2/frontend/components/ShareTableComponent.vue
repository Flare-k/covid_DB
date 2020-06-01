<template>
  <v-layout class="py-10" justify-center="center">
    <v-flex
      xs12 md10>
      <v-data-table
        :headers="headers"
        :items="files"
        hide-actions
        hide-default-footer
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.shareDate }}</td>
          <td class="text-xs-right">{{ props.item.sharePerson }}</td>
          <td class="text-xs-right">{{ props.item.acitivity }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'ShareTableComponent',
    // computed: {
    //   files: this.$store.state.file.files
    // },
    data () {
      return {
        headers: [
          {
            text: '이름',
            align: 'left',
            sortable: 'false',
            value: 'name'
          },
          { text: '공유된 날짜', value: 'shareDate'},
          { text: '공유한 사람', value: 'sharePerson'},
          { text: '활동', value: 'activity'}
        ],
        files: [
        ]
      }
    }
  }
</script>
