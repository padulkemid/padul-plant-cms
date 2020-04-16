<template>
  <div>
    <template v-if="this.items == 'products'">
      <div class="buttons">
        <b-button type="is-info" @click="showSearch = !showSearch">
          Search by name
        </b-button>
      </div>
      <b-table
        :data="getProducts"
        ref="table"
        bordered
        hoverable
        mobile-cards
        paginated
        per-page="10"
        detailed
        detail-key="id"
        :show-detail-icon="false"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <template slot-scope="props">
          <b-table-column field="id" label="ID" width="40" numeric headerClass="is-primary">
            {{ props.row.id }}
          </b-table-column>

          <b-table-column
            field="name"
            label="Plant Name"
            :searchable="showSearch"
            headerClass="is-primary"
          >
            <a @click="toggle(props.row)">
              {{ props.row.name }}
            </a>
          </b-table-column>

          <b-table-column field="price" label="Price" centered headerClass="is-success">
            Rp. {{ props.row.price }}
          </b-table-column>

          <b-table-column field="stock" label="Stock" centered headerClass="is-warning">
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

        <template slot="detail" slot-scope="props">
          <article class="media">
            <figure class="media-left">
              <p class="image is-128x128">
                <img :src="props.row.image_url" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content align-b">
                <strong>{{ props.row.name }}</strong
                ><br />
                <hr />
                <div class="field">
                  <b>Posted on </b> {{ new Date(props.row.createdAt).toString().slice(0, 21)
                  }}<br />
                  <b>Updated on </b> {{ new Date(props.row.updatedAt).toString().slice(0, 21) }}
                </div>
                <div class="buttons">
                  <button class="button is-info is-outlined">
                    Edit
                  </button>
                  <button class="button is-danger is-outlined">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </article>
        </template>
      </b-table>
    </template>

    <template v-else-if="this.items == 'users'">
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
    </template>
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
  methods: {
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },
  },
  data() {
    return {
      showSearch: false,
    };
  },
};
</script>

<style scoped>
hr {
  border: 1px solid black;
  margin: 2% auto;
}
.align-b b {
  display: inline-block;
  width: 20%;
  position: relative;
  padding-right: 10px;
}
.align-b b::after {
  content: ':';
  position: absolute;
  right: 10px;
}
</style>
