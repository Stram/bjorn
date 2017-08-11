<template lang="html">
  <simple-action-layout>
    <h1
      slot="header"
      :class="$style.title"
    >
      {{title}}
    </h1>
    
    <LoginForm
      slot="footer"
      :form="loginForm"
    />
  </simple-action-layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import LoginFormComponent from 'components/forms/LoginForm.vue';
  import SimpleActionLayout from 'components/layouts/SimpleAction.vue';
  import LoginForm from 'forms/LoginForm';

  const titles = [
    'Who are you?',
    'Do I know you?',
    'Knock knock!'
  ];

  @Component({
    components: {
      LoginForm: LoginFormComponent,
      SimpleActionLayout,
    }
  })
  export default class LoginPage extends Vue {
    loginForm = new LoginForm({store: this.$store});
    title = titles[Math.floor(Math.random() * titles.length)];
  }
</script>

<style lang="scss" module>
  .title {
    color: var(--color-secondary);
  }
</style>
