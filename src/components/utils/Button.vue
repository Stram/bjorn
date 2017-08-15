<template lang="html">
  <button
    :class="[$style.button, themeClass]"
    :disabled="disabled"
    type="button"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  import ButtonThemes from 'enums/button-themes';

  @Component({
    props: {}
  })
  export default class UtilButton extends Vue {
    @Prop({ type: Number, default: ButtonThemes.PRIMARY })
    private theme: ButtonThemes;

    @Prop({ type: Boolean, default: false })
    private disabled: boolean;

    get themeClassMap() {
      return {
        [ButtonThemes.PRIMARY]: this.$style.primary,
        [ButtonThemes.SECONDARY]: this.$style.secondary,
        [ButtonThemes.LIGHT]: this.$style.light,
        [ButtonThemes.OUTLINE]: this.$style.outline,
      };
    }

    get themeClass() {
      return this.themeClassMap[this.theme];
    }

    onClick() {
      if (!this.disabled) {
        this.$emit('click');
      }
    }
  }
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
}

.primary {
  background-color: var(--color-light);
  color: var(--color-primary);
}

.secondary {
  background-color: var(--color-light);
  color: var(--color-secondary);
}

.light {
  background-color: var(--color-secondary);
  color: var(--color-light);
}

.outline {
  border: 3px solid var(--color-light);
  background-color: transparent;
  color: var(--color-light);
}
</style>
