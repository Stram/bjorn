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
        <div
          :class="$style.previewPrimary"
          :style="{
            backgroundColor: `var(--base-${theme.primaryColor})`
          }"
        >
          <div
            :class="$style.arrow"
            :style="{
              borderBottomColor: `var(--base-${theme.primaryColor})`,
              borderLeftColor: `var(--base-${theme.primaryColor})`
            }"
          ></div>
        </div>

        <div
          :class="$style.previewSecondary"
          :style="{
            backgroundColor: `var(--base-${theme.secondaryColor})`
          }"
        >
          <div
            :class="$style.arrow"
            :style="{
              borderTopColor: `var(--base-${theme.secondaryColor})`,
              borderRightColor: `var(--base-${theme.secondaryColor})`
            }"
          ></div>
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
  $preview-size: 80px;

  .container {
    padding: 30px 20px;
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
      .preview-primary {
        transform: translate(-10px, -5px);
      }

      .preview-secondary {
        transform: translate(10px, 5px);
      }
    }
  }

  .preview-primary,
  .preview-secondary {
    transition: transform 150ms ease;
    position: relative;
    width: $preview-size;
    height: $preview-size;

    .arrow {
      position: absolute;
      border-top: $preview-size / 2 solid transparent;
      border-right: $preview-size / 4 solid transparent;
      border-bottom: $preview-size / 2 solid transparent;
      border-left: $preview-size / 4 solid transparent;
    }
  }

  .preview-primary {
    margin-right: $preview-size / 2;

    .arrow {
      right: -$preview-size / 2;
    }
  }

  .preview-secondary {
    .arrow {
      left: -$preview-size / 2;
    }
  }
</style>
