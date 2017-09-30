<template>
  <div :class="$style.container">
    <app-header
      :user="currentUser"
      :activeTheme="activeTheme"
      @user:logout="onLogout"
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

    watch: {
      currentUser() {
        if (!this.currentUser) {
          this.$router.push({
            name: pages.LOGIN
          });
        }
      }
    },

    computed: {
      currentUser() {
        return this.$store.getters['session/currentUser'];
      },

      activeTheme() {
        return this.$store.state.ui.theme;
      }
    },

    methods: {
      onLogout() {
        this.$store.dispatch('session/logout');
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
