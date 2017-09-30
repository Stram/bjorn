<template>
  <div>
    <theme-picker
      :activeTheme="activeTheme"
      @theme:set="onThemeSet"
    />

    <session
      :user="user"
      @user:logout="onLogout"
    />
  </div>
</template>

<script>
  import themePicker from 'components/settings/theme-picker';
  import session from 'components/settings/session';

  export default {
    components: {
      themePicker,
      session
    },

    props: {
      user: {
        type: Object,
        required: true
      },

      activeTheme: {
        type: String,
        required: true
      }
    },

    methods: {
      onThemeSet(themeId) {
        this.$emit('theme:set', themeId);
      },

      onLogout() {
        this.$emit('user:logout');
      }
    }
  };
</script>

<style lang="scss" module>
</style>
