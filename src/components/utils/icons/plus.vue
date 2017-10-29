<template>
  <div
    :class="$style.wrapper"
    :style="wrapperStyle"
  >
    <div :class="$style.horizontal"></div>
    <div :class="$style.vertical"></div>
  </div>
</template>

<script>
  export default {
    props: {
      size: {
        type: Number,
        default: 40
      }
    },

    computed: {
      wrapperStyle() {
        return {
          width: this.size,
          height: this.size
        }
      }
    }
  }
</script>

<style lang="scss" module>
  .wrapper {
    position: relative;
  }

  .horizontal {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 8px;
    transform: translateY(-50%);
    background-color: var(--color-light);
  }

  .vertical {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 8px;
    transform: translateX(-50%);
    background-color: var(--color-light);
  }
</style>
