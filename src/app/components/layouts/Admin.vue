<template>
  <div :class="$style.container">
    <slot name="header">
    
    </slot>

    <slot />

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({})
export default class AdminLayout extends Vue {

}
</script>

<style lang="scss" module>
  .container {
    background-color: var(--color-light);
    min-height: 100vh;
  }
</style>
