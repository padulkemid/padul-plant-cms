<template>
  <div>
    <section class="hero is-primary is-bold is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            - Sign In -
          </h1>
          <h2 class="subtitle">
            Access your item, <i>Admin</i>.<br />
            &darr; Enter your credentials here &darr;
          </h2>
          <Form></Form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Form from '@/components/Form.vue';

export default {
  name: 'Login',
  components: {
    Form,
  },
};
</script>
