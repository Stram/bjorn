<template>
  <div :class="$style.container">
    <div :class="$style.label">
      You are currently logged in as {{user.name}}
    </div>

    <util-button
      :theme="buttonThemes.PRIMARY"
      :class="$style.action"
      @click="onLogoutClick"
    >
      Logout
    </util-button>
  </div>
</template>

<script>
  import utilButton from 'components/utils/button';
  import buttonThemes from 'enums/button-themes';

  export default {
    components: {
      utilButton
    },

    props: {
      user: {
        type: Object,
        required: true
      }
    },

    methods: {
      onLogoutClick() {
        this.$emit('user:logout');
      }
    },

    data() {
      return {
        buttonThemes
      }
    }
  };
</script>

<style lang="scss" module>
  @import 'mixins';

  .container {
    @include flex();
    border-bottom: 3px solid var(--color-primary);
    padding: 20px;
  }

  .label {
    font-size: 24px;
    font-weight: bold;
    flex: 1;
    margin-right: 16px;
  }
</style>
