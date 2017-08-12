<template>
  <div :class="$style.backdrop"
    @click="onBackdropClick"
  >
    <div :class="$style.container"
      @click.stop
    >
      <div
        v-if="title"
        :class="$style.header"
      >
        {{title}}
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    }
  },

  methods: {
    onBackdropClick() {
      this.$emit('close');
    }
  },

  created() {
    // document.body.classList.add('');
  },

  beforeDestroy() {
    // document.body.classList.remove('');
  }
}
</script>

<style lang="scss" module>
  @import 'mixins';

  .backdrop {
    @include strech(fixed);
    display: grid;
    grid-template-columns: minmax(50px, 1fr) minmax(auto, 1142px) minmax(50px, 1fr);
    grid-template-rows: 1fr;
    grid-template-areas: '. container .';
    justify-items: stretch;
    align-items: center;
  }

  .container {
    grid-area: container;
    padding: 0 48px 48px;
    background-color: var(--color-secondary);
  }

  .header {
    padding: 40px 0 48px 0;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    color: var(--color-light);
  }
</style>
