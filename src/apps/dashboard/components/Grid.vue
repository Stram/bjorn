<template lang="html">
  <div>
    Show widgets here

    <TimeWidget 
      :widget="timeWidget"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import {widgets} from 'apps/dashboard/components';
  import TimeWidgetModel from 'apps/dashboard/models/widgets/Time';

  @Component({
    components: widgets
  })
  export default class Grid extends Vue {
    timeWidget = new TimeWidgetModel({
      width: 1, height: 1, refreshInterval: 1000
    })
  }
</script>

<style lang="scss" module>

</style>
