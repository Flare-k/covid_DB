<template>
  <div>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card>
          <v-form v-model="valid" @submit.prevent="signUp">
            <v-card-text>
              <v-text-field
                v-model="email"
                :rules="[rules.email]"
                prepend-icon="email"
                label="email">
              </v-text-field>
              <v-text-field
                v-model="username"
                :rules="[rules.username]"
                prepend-icon="person"
                label="username">
              </v-text-field>
              <v-text-field
                v-model="password"
                :rules="[rules.password]"
                prepend-icon="lock"
                type="password"
                label="password">
              </v-text-field>
              <v-text-field
                v-model="checkpassword"
                :rules="[rules.checkpassword]"
                prepend-icon="lock"
                type="password"
                label="checkpassword">
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="grey"
                type="submit">
                회원가입
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
    name: "SignUpComponent",
    data() {
      return {
        valid: false,
        email: '',
        username: '',
        password: '',
        checkpassword: '',
        rules: {
          email: v => (v || '').match(/@/) || 'Please enter a valid email',
          username: v => !!v || 'username is required',
          password: v => !!v || 'password is required',
          checkpassword: v => v == this.password || 'checkpassword is incorrect'
        }
      }
    },
    methods: {
      async signUp() {
        try {
          console.log('signUp Method');
          //$store.dispatch -> action의 signUp 함수를 불러올 수 있음
          await this.$store.dispatch('user/signUp', {
            email: this.email,
            username: this.username,
            password: this.password
          });
          await this.$router.replace('/');
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
</script>

<style scoped>

</style>


