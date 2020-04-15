<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          Sign In
        </h1>
        <h2 class="subtitle">
          Access your item, <i>Admin</i>.<br />
          Enter your credentials here &darr;
        </h2>

        <div id="form">
          <b-field label="Username" :label-position="labelPosition">
            <b-input placeholder="padulkemid" maxlength="30"></b-input>
          </b-field>
          <b-field label="Password" :label-position="labelPosition">
            <b-input placeholder="Password here...." type="password" maxlength="30"> </b-input>
          </b-field>
          <div class="notification is-light buttons is-centered">
            <b-button type="is-primary" outlined>
              Sign In
            </b-button>
            <b-button type="is-danger" outlined>
              Cancel
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      labelPosition: 'inside',
    };
  },
};
</script>

<style scoped>
#form {
  margin: auto 25%;
}
</style>
