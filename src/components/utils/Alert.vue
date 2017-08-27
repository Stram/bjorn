<template>
  <portal to="alert">
    <util-backdrop
      :transparent="false"
      :opacity="true"
    >
      <div :class="$style.container">
        <div :class="$style.message">
          {{message}}
        </div>
        <div :class="$style.actions">
          <util-button
            v-if="secondaryActionLabel"
            :class="$style.action"
            :theme="buttonThemes.SECONDARY_OUTLINE"
            @click="onSecondaryButtonClick"
          >
            {{secondaryActionLabel}}
          </util-button>

          <util-button
            v-if="primaryActionLabel"
            :class="$style.action"
            :theme="buttonThemes.LIGHT"
            @click="onPrimaryButtonClick"
          >
            {{primaryActionLabel}}
          </util-button>
        </div>
      </div>
    </util-backdrop>
  </portal>
</template>

<script>
  import UtilBackdrop from 'components/utils/Backdrop.vue';
  import UtilButton from 'components/utils/Button.vue';

  import buttonThemes from 'enums/button-themes';

  export default {
    components: {
      UtilBackdrop,
      UtilButton
    },

    props: {
      message: {
        type: String,
        required: true
      },
      primaryActionLabel: {
        type: String
      },
      secondaryActionLabel: {
        type: String
      }
    },

    methods: {
      onPrimaryButtonClick() {
        this.$emit('action:primary');
      },

      onSecondaryButtonClick() {
        this.$emit('action:secondary');
      }
    },

    data() {
      return {
        buttonThemes
      };
    }
  };
</script>

<style lang="scss" module>
  .container {
    border: 5px solid var(--color-secondary);
    background-color: var(--color-light);
    grid-area: container;
    margin: 0 auto;
    z-index: 1;
    padding: 16px;
  }

  .message {
    font-size: 20px;
    padding: 8px;
  }

  .actions {
    margin-top: 16px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

  }

  .action {
    &:not(:first-child) {
      margin-left: 16px;
    }
  }
</style>
