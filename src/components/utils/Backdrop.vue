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
      }
    },

    created() {
      // TODO Esc press
      document.body.classList.add('disable-scroll');
    },

    beforeDestroy() {
      // TODO Esc press
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

    &.fill {
      &::after {
        @include stretch(fixed);
        content: "";
        background-color: var(--color-secondary);
      }
    }

    &.opacity {
      &::after {
        opacity: 0.8;
      }
    }
  }
</style>
