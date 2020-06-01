<template>
  <div>
    <v-row
      align="center"
      justify="center">
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card>
          <v-form v-model="valid" @submit.prevent="login">
            <v-card-text>
              <v-text-field
                v-model="username"
                :rules="[rules.username]"
                label="username"
                prepend-icon="person">
              </v-text-field>
              <v-text-field
                v-model="password"
                :rules="[rules.password]"
                type="password"
                label="password"
                prepend-icon="lock">
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="grey"
                type="submit">
                로그인
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>


<script>
  export default {
    name: "loginComponent",
    data() {
      return {
        valid: false,
        tryLogin: true,
        username: '',
        password: '',
        rules: {
          username: v => !!v || 'username is required',
          password: v => !!v || 'password is required',
        }
      }
    },
    methods: {
      async login() {
        try {
          console.log('login Method');
          await this.$store.dispatch('user/login', {
            username: this.username,
            password: this.password
          });
          await this.$router.replace('/');
        } catch (e) {
          console.error(e);
        }
      },
      changeTryLogin() {
        this.tryLogin = !this.tryLogin;
      }
    }
  }
</script>
