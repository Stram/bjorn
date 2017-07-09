<template lang="html">
  <main :id="config.APP_ROOT_ID">
    <h1>{{title}}</h1>
    <Grid />
  </main>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import {APP_ROOT_ID} from '../config';
  import Grid from './Grid.vue';

  @Component({
    components: {
      Grid
    }
  })
  export default class App extends Vue {
    title = 'Welcome to Dashboard application'

    config = {
      APP_ROOT_ID
    }
  }
</script>

<style lang="scss" module>

</style>
