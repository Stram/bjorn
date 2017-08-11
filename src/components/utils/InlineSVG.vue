<template lang="html">
  <div v-html="src"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  props: {
    src: {
      type: String,
      required: true,
    }
  }
})
export default class InlineSVG extends Vue {

}
</script>

<style lang="scss" module>

</style>
