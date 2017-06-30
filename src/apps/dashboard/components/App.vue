<template lang="html">
  <div>
    <h1>{{property}}</h1>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({})
  export default class App extends Vue {
    property = 'stringer'
  }
  
</script>

<style lang="scss" module>

</style>
