<template>
  <div :style="resizedStyle">
    <slot />
  </div>
</template>

<script>
  const RATIO_16_9 = 16 / 9;

  export default {
    props: {
      size: {
        type: Object,
        required: true,
      },

      margins: {
        type: Object,
        required: true,
      }
    },

    computed: {
      width() {
        return this.size.width;
      },

      height() {
        return this.size.height;
      },

      ratio() {
        return this.width / this.height;
      },

      verticalMargins() {
        return this.margins.top + this.margins.bottom;
      },

      horizontalMargins() {
        return this.margins.left + this.margins.right;
      },

      resizedSize() {
        const ratioAboveDesired = this.ratio > RATIO_16_9;
        const height = ratioAboveDesired ? this.height : this.width / RATIO_16_9;
        const width = ratioAboveDesired ? this.height * RATIO_16_9 : this.width;

        return {
          height: height - this.verticalMargins,
          width: width - this.horizontalMargins,
        };
      },

      resizedStyle() {
        return {
          height: `${this.resizedSize.height}px`,
          width: `${this.resizedSize.width}px`
        };
      }
    },
  };
</script>
