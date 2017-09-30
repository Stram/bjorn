<template>
  <div :class="$style.container">
    <div :class="$style.title">
      Theme
    </div>
    <div
      :class="$style.themes"
    >
      <button
        v-for="theme in themes"
        :class="$style.theme"
        @click="onThemeClick(theme.id)"
      >
        <div :class="$style.previewPrimaryWrapper">
          <div
            :class="$style.previewPrimary"
            :style="{
              backgroundColor: `var(--base-${theme.primaryColor})`
            }"
          >
            <transition name="fade">
              <div
                v-if="theme.id === activeTheme"
                :class="$style.label"
                :style="{
                  color: `var(--base-${theme.secondaryColor})`
                }"
              >
                Active
              </div>
            </transition>
          </div>
        </div>

        <div :class="$style.previewSecondaryWrapper">
          <div
            :class="$style.previewSecondary"
            :style="{
              backgroundColor: `var(--base-${theme.secondaryColor})`
            }"
          >
            <transition name="fade">
              <div
                v-if="theme.id === activeTheme"
                :class="$style.label"
                :style="{
                  color: `var(--base-${theme.primaryColor})`
                }"
              >
                Active
              </div>
            </transition>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import inlineSVG from 'components/utils/inline-svg';
  import themes from 'enums/themes';

  export default {
    components: {
      'inline-svg': inlineSVG
    },

    props: {
      activeTheme: {
        type: String,
        required: true
      }
    },

    methods: {
      onThemeClick(themeId) {
        this.$emit('theme:set', themeId);
      }
    },

    data() {
      return {
        themes: Object.values(themes)
      };
    }
  };
</script>

<style lang="scss" module>
  @import 'mixins';

  $preview-size: 80px;
  $skew-degree: 25.565deg; // arctg(0.5)
  $skex-size: $preview-size / 4;

  .container {
    padding: 30px 20px 40px;
    border-bottom: 3px solid var(--color-primary);
  }

  .title {
    text-transform: uppercase;
    font-weight: bold;
    margin-left: 20px;
    font-size: 24px;
    color: var(--color-primary);
  }

  .themes {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;
  }

  .theme {
    position: relative;
    margin: 0 20px;
    display: flex;
    align-items: center;

    &:hover {
      .preview-primary-wrapper {
        transform: translate(-10px, -5px);
      }

      .preview-secondary-wrapper {
        transform: translate(10px, 5px);
      }
    }
  }

  .preview-primary-wrapper,
  .preview-secondary-wrapper {
    overflow: hidden;
    transition: transform 150ms ease;
  }

  .preview-primary-wrapper {
    margin-right: -$skex-size;
  }

  .preview-secondary-wrapper {
    margin-left: -$skex-size;
  }

  .preview-primary,
  .preview-secondary {
    position: relative;
    width: 1.5 * $preview-size;
    height: $preview-size;
    transform: skewX($skew-degree);
    overflow: hidden;
  }

  .preview-primary {
    left: -$skex-size;

    .label {
      right: -1.5 * $preview-size;
    }
  }

  .preview-secondary {
    right: -$skex-size;

    .label {
      left: -1.5 * $preview-size;
    }
  }

  .label {
    @include flex();
    @include stretch();
    transform: skewX(-$skew-degree);
    font-size: 32px;
    font-weight: bold;
    text-transform: uppercase;
  }
</style>
