<template>
  <div id="form">
    <b-field label="Username" :label-position="labelPosition">
      <b-input v-model="form.username" placeholder="Username here...." maxlength="30"></b-input>
    </b-field>
    <b-field label="Password" :label-position="labelPosition">
      <b-input
        v-model="form.password"
        placeholder="Password here...."
        type="password"
        maxlength="30"
      >
      </b-input>
    </b-field>
    <b-button @click="dispatchToState" type="is-warning" expanded>
      Sign In
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'Form',
  methods: {
    dispatchToState() {
      const data = {
        username: this.form.username,
        password: this.form.password,
      };

      this.$store.commit('SET_LOGIN', true);
      this.$store.commit('SET_FORM', data);
      this.$store.dispatch('postLogin', data).then((res) => {
        if (!res.token || !res.isAdmin) {
          this.$buefy.toast.open({
            duration: 5000,
            message: res.message,
            position: 'is-bottom',
            type: 'is-danger',
          });
        } else {
          this.$router.push('/home');
          this.$buefy.toast.open({
            message: 'Welcome, Admin!',
            type: 'is-success',
          });
        }
      });
    },
  },
  data() {
    return {
      labelPosition: 'inside',
      form: {
        username: '',
        password: '',
      },
    };
  },
};
</script>

<style scoped>
#form {
  margin: auto 25%;
}
</style>
