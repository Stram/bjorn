<template lang="html">
  <div>
    It seems like you are not authorized.

    <LoginForm
      :form="loginForm"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  import LoginFormComponent from 'app/components/forms/LoginForm.vue';
  import LoginForm from 'app/forms/LoginForm';

  @Component({
    components: {
      LoginForm: LoginFormComponent
    }
  })
  export default class LoginPage extends Vue {
    loginForm = new LoginForm({store: this.$store});
  }
</script>

<style lang="scss" module>

</style>
