<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          Sign In
        </h1>
        <h2 class="subtitle">
          Access your item, <i>Admin</i>.<br />
          Enter your credentials here &darr;
        </h2>

        <div id="form">
          <b-field label="Username" :label-position="labelPosition">
            <b-input v-model="form.username" placeholder="padulkemid" maxlength="30"></b-input>
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
          <b-button @click="dispatchToState" type="is-info" expanded>
            Sign In
          </b-button>
        </div>
      </div>
    </div>
  </section>
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
