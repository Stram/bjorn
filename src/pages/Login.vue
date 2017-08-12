<template lang="html">
  <simple-action-layout>
    <h1
      slot="header"
      :class="$style.title"
    >
      {{title}}
    </h1>
    
    <div slot="footer">
      <app-button
        :theme="buttonThemes.SECONDARY"
        :class="$style.loginButton"
        @click="onLogin"
      >
        Login
      </app-button>
    </div>
  </simple-action-layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import AppButton from 'components/utils/Button.vue';
  import SimpleActionLayout from 'components/layouts/SimpleAction.vue';
  
  import ButtonThemes from 'enums/button-themes';
  import { pages } from 'router';

  const titles = [
    'Who are you?',
    'Do I know you?',
    'Knock knock!'
  ];

  @Component({
    components: {
      SimpleActionLayout,
      AppButton,
    }
  })
  export default class LoginPage extends Vue {
    buttonThemes = ButtonThemes
    title = titles[Math.floor(Math.random() * titles.length)];

    onLogin() {
      this.$store.dispatch('session/login').then(() => {
        this.$router.push({
          name: pages.ADMIN,
        })
      });
    }
  }
</script>

<style lang="scss" module>
  .title {
    color: var(--color-secondary);
  }

  .login-button {
    border: 5px solid var(--color-secondary);
    font-size: 130px;
    line-height: 150px;
    padding: 20px 120px;
  }

</style>
