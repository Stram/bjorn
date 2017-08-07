<template lang="html">
  <div :class="$style.wrapper">
    <div :class="$style.content"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({})
export default class Spinner extends Vue {

}
</script>

<style lang="scss" module>
$spinner-size: 50px;

@keyframes spinner-rotating-wrapper {
  0% {
    transform: rotate(0deg)
  }

  100% {
    transform: rotate(180deg)
  }
}

.wrapper {
  width: $spinner-size;
  height: $spinner-size;
  border: 5px solid var(--color-light);
  position: relative;
  animation-name: spinner-rotating-wrapper;
  animation-delay: 0s;
  animation-duration: 1s;
}

.content {
  height: 0%;
  width: 100%;
}
</style>
