<template>
  <div class="home">
    <h1 class="title">{{ getUser }}</h1>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  computed: {
    getUser() {
      return this.$store.state.user;
    },
  },
};
</script>
