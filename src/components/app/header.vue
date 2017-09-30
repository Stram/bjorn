<template>
  <div :class="$style.container">
    <header :class="$style.header">
      <router-link
        :class="$style.action"
        :to="{name: pages.INDEX}"
      >
        Preview
      </router-link>

      <button
        :class="[$style.action, {
            [$style.isInverse]: isMenuOpen
          }]"
        @click="onSettingsLinkClick"
      >
        Settings
      </button>
    </header>

    <transition name="slide" appear>
      <settings
        v-if="isMenuOpen"
        :class="$style.menu"
      />
    </transition>
  </div>
</template>

<script>
  import InlineSVG from 'components/utils/inline-svg.vue';
  import settings from 'components/app/settings';

  import {pages} from 'router';

  import * as logoutIcon from 'images/sign-out.svg';

  export default {
    components: {
      'inline-svg': InlineSVG,
      settings
    },

    props: {
      user: {
        type: Object,
        required: true,
      }
    },

    methods: {
      onSettingsLinkClick() {
        this.toggleSettingsPreview();
      },

      onLogout() {
        this.$emit('logout');
      },

      toggleSettingsPreview() {
        this.isMenuOpen = !this.isMenuOpen;
      }
    },

    data() {
      return {
        isMenuOpen: false,
        logoutIcon,
        pages
      };
    }
  };
</script>

<style lang="scss" module>
  @import 'mixins';
  @import 'z-indices';

  $header-height: 80px;
  $header-padding: 16px;

  .container {
    position: relative;
  }

  .header {
    @include flex(center, space-between);
    width: 100%;
    background-color: var(--color-light);
    height: $header-height;
    padding: $header-padding;
    position: relative;
    z-index: $header-z-index;
  }

  .action {
    @include flex();
    height: $header-height - 2 * $header-padding;
    background-color: var(--color-primary);
    text-transform: uppercase;
    color: var(--color-light);
    min-width: 120px;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
    padding: 0 20px;
    border: 3px solid var(--color-primary);
    transition: color, background-color, transform 300ms;

    &:hover {
      transform: scale(1.1);
    }

    &.is-inverse {
      background-color: var(--color-light);
      color: var(--color-primary);
    }
  }

  .menu {
    @include stretch(absolute, $header-height, 0, auto, 0);
    background-color: var(--color-light);
    z-index: $header-menu-z-index;
    border-top: 4px solid var(--color-primary);
  }
</style>
