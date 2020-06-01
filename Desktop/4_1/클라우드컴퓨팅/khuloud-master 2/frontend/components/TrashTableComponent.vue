<template>
  <v-layout justify-center="center" class="my-10">
    <v-flex xs12 md10>
      <v-data-table :headers="headers" :items="files" hide-actions hide-default-footer>
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.deletedDate }}</td>
          <td class="text-xs-right">{{ props.item.deletePerson }}</td>
          <td class="text-xs-right">{{ props.item.makePerson }}</td>
          <td class="text-xs-right">{{ props.item.originalPath }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>

</template>

<script>
  export default {
    name: 'TrashTableComponent',
    data() {
      return {
        headers: [
          {
            text: '이름',
            align: 'left',
            sortable: 'false',
            value: 'name'
          },
          {text: '삭제된 날짜', value: 'deletedDate'},
          {text: '삭제한 사람', value: 'deletePerson'},
          {text: '만든 사람', value: 'makePerson'},
          {text: '원래 위치', value: 'originalPath'}
        ],
        files: []
      }
    }
  }
</script>
