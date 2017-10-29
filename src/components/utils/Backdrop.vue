<template>
  <transition
    name="fade"
    :appear="true"
  >
    <div
      :class="[$style.backdrop, {
        [$style.fill]: !transparent,
        [$style.opacity]: opacity
      }]"
      @click="onBackdropClick"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  import keyCodes from 'enums/key-codes';

  export default {
    props: {
      transparent: {
        type: Boolean,
        default: true
      },
      opacity: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      onBackdropClick() {
        this.$emit('click');
      },

      onEscPress() {
        this.$emit('click');
      },

      onKeyPress(event) {
        if (event.keyCode === keyCodes.ESC) {
          this.onEscPress();
        }
      }
    },

    created() {
      document.body.addEventListener('keyup', this.onKeyPress);
      document.body.classList.add('disable-scroll');
    },

    beforeDestroy() {
      document.body.removeEventListener('keyup', this.onKeyPress);
      document.body.classList.remove('disable-scroll');
    }
  };
</script>

<style lang="scss" module>
  @import 'mixins';

  .backdrop {
    @include stretch(fixed);
    display: grid;
    grid-template-columns: minmax(50px, 1fr) minmax(auto, 1142px) minmax(50px, 1fr);
    grid-template-rows: 1fr;
    grid-template-areas: '. container .';
    justify-items: stretch;
    align-items: center;
    z-index: var(--backdrop-z-index);

    &::before {
      @include stretch();
      content: '';
      opacity: 0.8;
      background-color: var(--color-primary);
    }
  }
</style>
