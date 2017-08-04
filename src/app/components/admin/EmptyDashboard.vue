<template>
  <section :class="$style.container">
    <h1 :class="$style.title">Sadly you don’t have any dashboard</h1>
    <h2 :class="$style.subtitle">Start by creating a new one</h2>
    <app-button
      :class="$style.button"
      :theme="ButtonThemes.LIGHT"
      @button:click="onCreateClick"
    >
      Create
    </app-button>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import { AppButton } from 'app/components';
  import ButtonThemes from 'app/enums/button-themes';

  @Component({
    components: {
      AppButton
    }
  })
  export default class ActionFooter extends Vue {
    ButtonThemes = ButtonThemes;

    onCreateClick() {
      this.$emit('dashboard:create');
    }
  }
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
