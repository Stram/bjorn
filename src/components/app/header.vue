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

    <transition name="slide">
      <settings
        v-if="isMenuOpen"
        :class="$style.menu"
        :user="user"
        :activeTheme="activeTheme"
        @user:logout="onLogout"
        @theme:set="onThemeSet"
      />
    </transition>

    <transition name="fade">
      <backdrop
        v-if="isMenuOpen"
        :class="$style.backdrop"
        @click="onBackdropClick"
      />
    </transition>
  </div>
</template>

<script>
  import settings from 'components/app/settings';
  import backdrop from 'components/utils/backdrop';

  import {pages} from 'router';

  export default {
    components: {
      settings,
      backdrop
    },

    props: {
      user: {
        type: Object,
        required: true
      },

      activeTheme: {
        type: String,
        required: true
      }
    },

    methods: {
      onSettingsLinkClick() {
        this.toggleSettingsPreview();
      },

      onBackdropClick() {
        this.toggleSettingsPreview();
      },

      onLogout() {
        this.$emit('user:logout');
      },

      onThemeSet(themeId) {
        this.$emit('theme:set', themeId);
      },

      toggleSettingsPreview() {
        this.isMenuOpen = !this.isMenuOpen;
      }
    },

    data() {
      return {
        isMenuOpen: false,
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
    transition: color, background-color, transform 150ms;

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

  .backdrop {
    background-color: var(--color-light);
    opacity: 0.3;
  }
</style>
