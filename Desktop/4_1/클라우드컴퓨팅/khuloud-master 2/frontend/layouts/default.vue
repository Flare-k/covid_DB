<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" router :to="item.route">
          <v-list-item-action :to="item.to">
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      :height="55"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title small>KHULOUD</v-toolbar-title>
      <v-spacer/>
      <v-btn icon class="mr-2" nuxt to="/inspire">
        <v-icon flat small>person</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <nuxt/>
    </v-content>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  import 'material-design-icons-iconfont/dist/material-design-icons.css'

  export default {
    props: {
      source: String,
    },
    data() {
      return {
        drawer: null,
        items: [
          {title: 'Khuloud', icon: 'school', route: '/'},
          {title: '내 파일', icon: 'folder', route: '/drive/file'},
          {title: '최근 항목', icon: 'list', route: '/'},
          {title: '사진', icon: 'image', route: '/inspire'},
          {title: '공유됨', icon: 'get_app', route: '/drive/shared-with-me'},
          {title: '휴지통', icon: 'delete', route: '/drive/trash'}
        ]
      }
    }
  }
</script>

<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
