<template>
  <transition
    name="fade"
    :appear="true"
  >
    <div :class="$style.backdrop"
      @click="onBackdropClick"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
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
    @include stretch();
    display: grid;
    grid-template-columns: minmax(50px, 1fr) minmax(auto, 1142px) minmax(50px, 1fr);
    grid-template-rows: 1fr;
    grid-template-areas: '. container .';
    justify-items: stretch;
    align-items: center;
  }
</style>
