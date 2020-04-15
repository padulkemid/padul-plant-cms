<template>
  <div id="app">
    <b-navbar id="nav" type="is-primary" spaced>
      <template slot="brand">
        <b-navbar-item>
          <h1 class="title has-text-white">Padul Jualan 🍀</h1>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="router-link" :to="{ path: '/home' }">
          Home
        </b-navbar-item>
        <b-navbar-item tag="div">
          <div class="buttons">
            <b-button type="is-danger" expanded outlined>
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
};
</script>

<style scoped>
#nav {
  border-bottom: 5px solid white;
}
</style>
