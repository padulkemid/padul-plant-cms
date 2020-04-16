<template>
  <section class="hero is-bold is-light is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          Welcome!
        </h1>
        <h2 class="subtitle">
          Please choose tabs and your actions.
        </h2>
        <Tabs></Tabs>
      </div>
    </div>
  </section>
</template>

<script>
import Tabs from '@/components/Tabs.vue';
export default {
  name: 'Home',
  components: {
    Tabs,
  },
  created() {
    this.$store.dispatch('getItems');
  },
};
</script>
