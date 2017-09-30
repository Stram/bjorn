<template>
  <div>
    <theme-picker
      @theme:set="onThemeSet"
    />
  </div>
</template>

<script>
  import themePicker from 'components/settings/theme-picker';

  export default {
    components: {
      themePicker
    },

    methods: {
      onThemeSet(themeId) {
        this.$emit('theme:set', themeId);
      }
    }
  };
</script>

<style lang="scss" module>
</style>
