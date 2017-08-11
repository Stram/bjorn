<template>
  <div :class="$style.container">
    <slot name="header" />
    <slot name="footer" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({})
export default class SimpleActionLayout extends Vue {
  
}
</script>

<style lang="scss" module>

  .container {
    background-color: var(--color-primary);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    min-height: 100vh;
    padding: 80px;
  }
</style>
