<template>
  <div :class="$style.actions">
    <util-button
      :theme="buttonThemes.OUTLINE"
      :class="$style.action"
      @click="onFormCancel"
    >
      Cancel
    </util-button>

    <util-button
      type="submit"
      :theme="disabled ? buttonThemes.LIGHT : buttonThemes.SECONDARY"
      :class="$style.action"
      :disabled="disabled"
    >
      Save
    </util-button>
  </div>
</template>

<script>
  import UtilButton from 'components/utils/button.vue';
  import buttonThemes from 'enums/button-themes';

  export default {
    components: {
      UtilButton
    },

    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      onFormCancel() {
        this.$emit('cancel');
      }
    },

    data() {
      return {
        buttonThemes
      };
    }
  };
</script>

<style lang="scss" module>
  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .action {
    &:not(:first-child) {
      margin-left: 40px;
    }
  }
</style>
