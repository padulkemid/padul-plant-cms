<template>
  <div>
    <template v-if="this.items == 'products'">
      <div class="buttons is-centered">
        <b-button type="is-info" @click="showSearch = !showSearch">
          Search by name
        </b-button>
        <AddForm formName="Add new Products" />
      </div>
      <b-table
        :data="getProducts"
        ref="table"
        bordered
        hoverable
        mobile-cards
        paginated
        per-page="6"
        detailed
        detail-key="id"
        :show-detail-icon="false"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <template slot-scope="props">
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
                  <button @click="editItem(props.row)" class="button is-info is-outlined">
                    Edit
                  </button>
                  <button @click="deleteItem(props.row.id)" class="button is-danger is-outlined">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </article>
          <b-modal :active.sync="showEdit" has-modal-card trap-focus aria-role="dialog" aria-modal>
            <form @submit.prevent="submitEdit">
              <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                  <p class="modal-card-title">Edit Product</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Plant Name">
                    <b-input
                      v-model="form.name"
                      type="text"
                      placeholder="Your plant name..."
                      maxlength="20"
                      required
                    >
                    </b-input>
                  </b-field>

                  <b-field label="Image URL">
                    <b-input
                      v-model="form.image_url"
                      type="url"
                      placeholder="Paste your image url..."
                      required
                    >
                    </b-input>
                  </b-field>

                  <b-field label="Price">
                    <b-input
                      v-model="form.price"
                      type="number"
                      placeholder="Rp..."
                      min="5000"
                      max="50000000"
                      step="any"
                      required
                    >
                    </b-input>
                  </b-field>

                  <b-field label="Stock">
                    <b-numberinput min="0" v-model="form.stock"> </b-numberinput>
                  </b-field>
                </section>
                <footer class="modal-card-foot">
                  <button class="button" type="button" @click="showEdit = false">Close</button>
                  <button class="button is-primary" @click="submitEdit">Edit!</button>
                </footer>
              </div>
            </form>
          </b-modal>
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
import AddForm from '@/components/AddForm.vue';

export default {
  name: 'Table',
  props: ['items'],
  components: {
    AddForm,
  },
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
    editItem(data) {
      this.showEdit = true;
      this.form.id = data.id;
      this.form.name = data.name;
      this.form.image_url = data.image_url;
      this.form.price = data.price;
      this.form.stock = data.stock;
    },
    submitEdit() {
      const { id, name, image_url, price, stock } = this.form;
      const data = {
        name,
        image_url,
        price: Number(price),
        stock,
      };

      const send = {
        data,
        id,
      };

      this.$store.dispatch('editItem', send).then((res) => {
        if (res.success) {
          this.$buefy.toast.open({
            message: 'Success edit data!',
            type: 'is-info',
          });
          this.$store.dispatch('getItems');
          this.showEdit = false;
        } else {
          this.$buefy.toast.open({
            message: res.message,
            type: 'is-danger',
          });
        }
      });
    },
    deleteItem(id) {
      this.$buefy.dialog.confirm({
        title: 'Deleting product...',
        message:
          'Are you sure you want to <b>delete</b> this product? This action cannot be undone.',
        confirmText: 'Delete!',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('deleteItem', id).then(() => {
            this.$buefy.toast.open({
              message: 'Successfully delete item!',
              type: 'is-warning',
            });
            this.$store.dispatch('getItems');
          });
        },
      });
    },
  },
  data() {
    return {
      showSearch: false,
      showEdit: false,
      form: {
        id: 0,
        name: '',
        image_url: '',
        price: '',
        stock: 0,
      },
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
