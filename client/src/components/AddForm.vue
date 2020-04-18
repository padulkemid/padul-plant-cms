<template>
  <b-dropdown append-to-body aria-role="menu" trap-focus>
    <button @click="showForm = !showForm" class="button is-success" slot="trigger">
      <span>{{ formName }}</span>
      <b-icon :icon="showForm ? 'chevron-up' : 'chevron-down'" size="is-small"></b-icon>
    </button>
    <b-dropdown-item aria-role="menu-item" custom paddingless>
      <form @submit.prevent="submitProduct">
        <div class="modal-card" style="width:300px;">
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

            <div class="buttons is-centered">
              <button type="submit" class="button is-primary">Add Product!</button>
            </div>
          </section>
        </div>
      </form>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'AddForm',
  props: ['formName'],
  data() {
    return {
      showForm: false,
      form: {
        name: '',
        image_url: '',
        price: '',
        stock: 0,
      },
    };
  },
  methods: {
    resetState() {
      this.form.name = '';
      this.form.image_url = '';
      this.form.price = '';
      this.form.stock = 0;
    },
    submitProduct() {
      let { name, image_url, price, stock } = this.form;

      // kapital di karakter pertama
      name = name.charAt(0).toUpperCase() + name.substring(1);

      console.log(this.formName);

      const submit = {
        name,
        image_url,
        price: Number(price),
        stock,
      };

      this.$store.dispatch('postItems', submit).then((res) => {
        if (res.created) {
          this.$buefy.toast.open({
            message: res.message,
            type: 'is-success',
          });
          this.$store.dispatch('getItems');
          this.resetState();
        } else {
          this.$buefy.toast.open({
            message: res.message,
            type: 'is-danger',
          });
        }
      });
    },
  },
};
</script>
