<template>
  <div :class="$style.container">
    <slot name="header" />
      <app-header
        :user="currentUser"
        @logout="onLogout"
      />
    </slot>

    <slot />

  </div>
</template>

<script>
  import AppHeader from 'components/app/header.vue';

  import {pages} from 'router';

  export default {
    components: {
      AppHeader,
    },

    computed: {
      currentUser() {
        return this.$store.getters['session/currentUser'];
      }
    },

    methods: {
      onLogout() {
        this.$store.dispatch('session/logout').then(() => {
          this.$router.push({
            name: pages.LOGIN
          });
        });
      }
    }
  };
</script>

<style lang="scss" module>
  .container {
    background-color: var(--color-light);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
