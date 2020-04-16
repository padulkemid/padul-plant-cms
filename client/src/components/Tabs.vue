<template>
  <section>
    <b-tabs position="is-centered" type="is-toggle">
      <b-tab-item label="Products">
        <h1 class="subtitle">
          <b>List of Products</b><br />
          Click plant names to reveal details.
        </h1>
        <Table :items="'products'"></Table>
      </b-tab-item>

      <b-tab-item label="Users">
        <h1 class="subtitle">List of Users</h1>
        <Table :items="'users'"></Table>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import Table from './Table.vue';
export default {
  name: 'Tabs',
  components: {
    Table,
  },
};
</script>
