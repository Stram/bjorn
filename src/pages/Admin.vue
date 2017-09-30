<template>
  <div :class="$style.container">
    <app-header
      :user="currentUser"
      @logout="onLogout"
      @theme:set="onThemeSet"
    />

    <router-view />
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
      },

      onThemeSet(themeId) {
        this.$store.dispatch('ui/setTheme', themeId);
      }
    }
  };
</script>

<style lang="scss" module>
  .container {
    background-color: var(--color-primary);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
