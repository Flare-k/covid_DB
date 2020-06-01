<template>
  <div>
    <div v-if="!me">
      Do login
    </div>
    <div v-else>
      {{me.username}}님 환영합니다
    </div>

  </div>
</template>

<script>

  export default {
    name: "home",
    data() {
      return {
        headers: [
          {
            text: '이름',
          }, {
            text: '수정한 날짜',
          }, {
            text: '공유',
          }, {
            text: '크기',
          }
        ],
        files: []
      }
    },
    computed: {
      me() {
        return this.$store.state.user.me;
      }
    }
  }
</script>

