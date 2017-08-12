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
      <button
        :class="$style.closeButton"
        @click="onCloseClick"
      >
        <inline-svg :src="icons.close" :class="$style.closeIcon"/>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import InlineSVG from 'components/utils/InlineSVG.vue';
import closeIcon from 'images/close.svg';

export default {
  components: {
    'inline-svg': InlineSVG,
  },

  props: {
    title: {
      type: String,
      default: '',
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
    border: 5px solid var(--color-light);
    position: relative;
  }

  .header {
    padding: 40px 0 48px 0;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    color: var(--color-light);
  }

  .close-button {
    $offset: 16px;
    position: absolute;
    top: $offset;
    right: $offset;
    padding: 8px;

    &:focus, 
    &:hover {
      background-color: var(--color-light);
      @include svg {
        fill: var(--color-secondary);
      }
    }
  }

  .close-icon {
    @include svg {
      fill: var(--color-light);
    }
  }
</style>
