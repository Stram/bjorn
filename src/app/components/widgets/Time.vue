<template lang="html">
  <section>
    {{formattedTime}}
  </section>
</template>

<script lang="ts">
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'


  import Widget from 'app/components/Widget.vue';
  import TimeWidgetModel from 'app/models/widgets/Time';

  @Component({})
  export default class TimeWidget extends Widget {
    @Prop({type:TimeWidgetModel, required: true})
    private widget: TimeWidgetModel

    private time: Date = new Date()
    private interval: NodeJS.Timer = null

    get formattedTime() {
      const hours = this.formatNumber(this.time.getHours());
      const minute = this.formatNumber(this.time.getMinutes());
      const seconds = this.formatNumber(this.time.getSeconds());
      return `${hours}:${minute}:${seconds}`;
    }

    private formatNumber(number: number) {
      return Math.abs(number) < 10 ? `0${number}` : String(number);
    }

    mounted() {
      this.interval = setInterval(() => {
        this.time = new Date();
      }, this.widget.refreshInterval);
    }

    beforeDestroy() {
      clearInterval(this.interval);
    }
  }
</script>

<style lang="scss" module>

</style>
