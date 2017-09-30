<template lang="html">
  <button
    :class="[$style.button, themeClass]"
    :disabled="disabled"
    :type="type"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
  import ButtonThemes from 'enums/button-themes';

  export default {
    props: {
      theme: {
        type: String,
        default: ButtonThemes.PRIMARY
      },

      disabled: {
        type: Boolean,
        default: false
      },

      type: {
        type: String,
        default: 'button'
      }
    },

    computed: {
      themeClassMap() {
        return {
          [ButtonThemes.PRIMARY]: this.$style.primary,
          [ButtonThemes.SECONDARY]: this.$style.secondary,
          [ButtonThemes.LIGHT]: this.$style.light,
          [ButtonThemes.OUTLINE]: this.$style.outline,
          [ButtonThemes.SECONDARY_OUTLINE]: this.$style.secondaryOutline,
        };
      },

      themeClass() {
        return this.themeClassMap[this.theme];
      }
    },

    methods: {
      onClick() {
        if (!this.disabled) {
          this.$emit('click');
        }
      }
    }
  };
</script>

<style lang="scss" module>

  .button {
    padding: 12px 24px;
    text-transform: uppercase;
    font-size: 24px;
    font-weight: 900;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color, background-color 150ms, transform 300ms;

    &:hover {
      transform: scale(1.1);
    }
  }

  .primary {
    background-color: var(--color-primary);
    color: var(--color-light);
  }

  .secondary {
    background-color: var(--color-secondary);
    color: var(--color-light);
  }

  .light {
    background-color: var(--color-light);
    color: var(--color-primary);
  }

  .outline {
    padding: 9px 21px;
    border: 3px solid var(--color-light);
    background-color: transparent;
    color: var(--color-light);
  }

  .secondary-outline {
    padding: 9px 21px;
    border: 3px solid var(--color-secondary);
    background-color: transparent;
    color: var(--color-secondary);
  }
</style>
