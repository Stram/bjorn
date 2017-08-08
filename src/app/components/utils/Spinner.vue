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
$animation-time: 3s;

@keyframes spinner-rotating-wrapper {
  0% {
    transform: rotate(0deg)
  }

  25% {
    transform: rotate(180deg)
  }

  50% {
    transform: rotate(180deg)
  }

  75% {
    transform: rotate(0deg)
  }
}

@keyframes spinner-fill {
  0% {
    transform: translateY(0%)
  }

  25% {
    transform: translateY(0%)
  }

  50% {
    transform: translateY(-100%)
  }

  75% {
    transform: translateY(-100%)
  }
}

.wrapper {
  width: $spinner-size;
  height: $spinner-size;
  border: 5px solid var(--color-light);
  position: relative;
  animation-name: spinner-rotating-wrapper;
  overflow: hidden;
}

.content {
  height: 100%;
  width: 100%;
  background-color: var(--color-primary);
  animation-name: spinner-fill;
}

.wrapper,
.content {
  animation-duration: $animation-time;
  animation-iteration-count: infinite;
}
</style>
