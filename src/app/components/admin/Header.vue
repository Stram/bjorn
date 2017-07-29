<template>
  <header :class="$style.container">

  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({})
export default class AdminHeader extends Vue {

}
</script>

<style lang="scss" module>
  .container {
    width: 100%;
    background-color: var(--color-primary);
    min-height: 60px;
    display: flex;
  }
</style>
