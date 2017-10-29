<template>
  <portal to="modal">
    <util-backdrop @click="onBackdropClick">
      <div :class="$style.container"
        @click.stop
      >
        <div :class="$style.header"> {{title}} </div>

        <button
          :class="$style.closeButton"
          @click="onCloseClick"
        >
          <inline-svg :src="icons.close" :class="$style.closeIcon" />
        </button>
        <slot></slot>
      </div>
    </util-backdrop>
  </portal>
</template>

<script>
  import UtilBackdrop from 'components/utils/backdrop.vue';
  import InlineSVG from 'components/utils/inline-svg.vue';

  import closeIcon from 'images/close.svg';

  export default {
    components: {
      'inline-svg': InlineSVG,
      UtilBackdrop
    },

    props: {
      title: {
        type: String,
        required: true,
      }
    },

    methods: {
      sendCloseSignal() {
        this.$emit('close');
      },

      onBackdropClick() {
        this.sendCloseSignal();
      },

      onCloseClick() {
        this.sendCloseSignal();
      }
    },

    data() {
      return {
        icons: {
          close: closeIcon,
        }
      };
    }
  };
</script>

<style lang="scss" module>
  @import 'mixins';

  .container {
    grid-area: container;
    padding: 0 48px 48px;
    background-color: var(--color-light);
    // border: 5px solid var(--color-primary);
    position: relative;
  }

  .header {
    padding: 40px 0 48px 0;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    color: var(--color-primary);
  }

  .close-button {
    $offset: 16px;
    position: absolute;
    top: $offset;
    right: $offset;
    padding: 8px;
    transition: background-color 150ms;

    &:focus,
    &:hover {
      background-color: var(--color-primary);
      @include svg {
        fill: var(--color-light);
      }
    }
  }

  .close-icon {
    @include svg {
      fill: var(--color-primary);
      transition: fill 150ms;
    }
  }
</style>
