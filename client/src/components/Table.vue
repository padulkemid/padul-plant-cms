<template>
  <div>
    <section v-if="this.items == 'products'">
      <b-table :data="getProducts" bordered hoverable mobile-cards>
        <template slot-scope="props">
          <b-table-column field="id" label="ID" width="40" numeric>
            {{ props.row.id }}
          </b-table-column>

          <b-table-column field="name" label="Plant Name">
            {{ props.row.name }}
          </b-table-column>

          <b-table-column field="image_url" label="Image">
            <img :src="props.row.image_url" alt="" />
          </b-table-column>

          <b-table-column field="price" label="Price" centered>
            Rp. {{ props.row.price }}
          </b-table-column>

          <b-table-column field="stock" label="Stock" centered>
            <div v-if="props.row.stock >= 1">
              <span class="tag is-success">
                Available
              </span>
            </div>
            <div v-else>
              <span class="tag is-danger">
                Not Available
              </span>
            </div>
            {{ props.row.stock }}
          </b-table-column>
        </template>
      </b-table>
    </section>

    <section v-else-if="this.items == 'users'">
      <b-table :data="getUsers" bordered hoverable mobile-cards>
        <template slot-scope="props">
          <b-table-column field="id" label="ID" width="40" numeric>
            {{ props.row.id }}
          </b-table-column>

          <b-table-column field="email" label="Email">
            {{ props.row.email }}
          </b-table-column>

          <b-table-column field="username" label="Username">
            {{ props.row.username }}
          </b-table-column>

          <b-table-column field="role" label="Role" centered>
            {{ props.row.role }}
          </b-table-column>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: ['items'],
  computed: {
    getProducts() {
      const items = this.$store.state.items;
      return items;
    },
    getUsers() {
      const users = this.$store.state.users;
      return users;
    },
  },
};
</script>

<style scoped>
img {
  height: 200px;
  width: 200px;
}
</style>
