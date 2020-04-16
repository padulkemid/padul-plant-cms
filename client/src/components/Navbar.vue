<template>
  <div id="app">
    <b-navbar id="nav" type="is-primary" spaced>
      <template slot="brand">
        <b-navbar-item>
          <h1 class="title has-text-white">Padul Jualan ( CMS ) 🍀</h1>
        </b-navbar-item>
      </template>
      <template slot="end" v-if="showLogout">
        <b-navbar-item tag="router-link" :to="{ path: '/home' }">
          Home
        </b-navbar-item>
        <b-navbar-item tag="div">
          <div class="buttons">
            <b-button @click="logout" type="is-danger" expanded outlined>
              Log Out
            </b-button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    showLogout: {
      get() {
        let check = this.$store.state.isLoggedIn;
        let token = localStorage.getItem('token');

        if (token || check) {
          return true;
        } else {
          return false;
        }
      },
      set() {
        return this.$store.commit('SET_LOGIN', true);
      },
    },
  },
  methods: {
    logout() {
      const data = {
        username: '',
        password: '',
      };

      localStorage.clear();

      this.showLogout = false;
      this.$store.commit('SET_LOGIN', false);
      this.$store.commit('SET_FORM', data);
      this.$router.push('/');
      this.$buefy.toast.open({
        message: 'Successfully logged out!',
        type: 'is-info',
      });
    },
  },
};
</script>

<style scoped>
#nav {
  border-bottom: 1px solid white;
}
</style>
