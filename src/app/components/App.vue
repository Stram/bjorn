<template lang="html">
  <main :id="config.APP_ROOT_ID">
    <router-view></router-view>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'

  import {APP_ROOT_ID} from '../config';

  @Component({})
  export default class App extends Vue {
    config = {
      APP_ROOT_ID
    }
  }
</script>

<style lang="scss" module>
  
</style>
