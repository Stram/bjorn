<template>
  <section :class="$style.container">
    <h1 :class="$style.title">Sadly you don’t have any dashboard</h1>
    <h2 :class="$style.subtitle">Start by creating a new one</h2>
    <util-button
      :class="$style.button"
      :theme="buttonThemes.LIGHT"
      @click="onCreateClick"
    >
      Create
    </util-button>
  </section>
</template>

<script>
  import UtilButton from 'components/utils/button.vue';

  import buttonThemes from 'enums/button-themes';

  export default {
    components: {
      UtilButton
    },

    methods: {
      onCreateClick() {
        this.$emit('dashboard:create');
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
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 48px 64px;
    border: 5px dashed var(--color-secondary);
    padding: 40px;
  }

  .title {
    text-align: center;
    font-size: 36px;
    font-weight: bold;
  }

  .subtitle {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-top: 16px;
  }

  .button {
    margin-top: 48px;
  }
</style>
