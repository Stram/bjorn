<template lang="html">
  <section>
    {{formattedTime}}
  </section>
</template>

<script>
  import TimeWidgetModel from 'models/widgets/Time';

  export default {
    props: {
      widget: {
        type: TimeWidgetModel,
        required: true,
      }
    },

    computed: {
      formattedTime() {
        const hours = this.formatNumber(this.time.getHours());
        const minute = this.formatNumber(this.time.getMinutes());
        const seconds = this.formatNumber(this.time.getSeconds());
        return `${hours}:${minute}:${seconds}`;
      },
    },

    methods: {
      formatNumber(number: number) {
        return Math.abs(number) < 10 ? `0${number}` : String(number);
      }
    },

    data() {
      return {
        time: new Date(),
        interval: null,
      };
    },

    mounted() {
      this.interval = window.setInterval(() => {
        this.time = new Date();
      }, this.widget.refreshInterval);
    },

    beforeDestroy() {
      if (this.interval) {
        window.clearInterval(this.interval);
      }
    }
  };
</script>

<style lang="scss" module>

</style>
