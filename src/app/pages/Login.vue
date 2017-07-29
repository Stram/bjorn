<template lang="html">
  <simple-action-layout>
    <h1
      slot="header"
      :class="$style.title"
    >
      Who are you?
    </h1>
    
    <LoginForm
      slot="footer"
      :form="loginForm"
    />
  </simple-action-layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  import {LoginForm as LoginFormComponent, SimpleActionLayout} from 'app/components';
  import LoginForm from 'app/forms/LoginForm';

  @Component({
    components: {
      LoginForm: LoginFormComponent,
      SimpleActionLayout,
    }
  })
  export default class LoginPage extends Vue {
    loginForm = new LoginForm({store: this.$store});
  }
</script>

<style lang="scss" module>
  .title {
    color: var(--color-secondary);
  }
</style>
