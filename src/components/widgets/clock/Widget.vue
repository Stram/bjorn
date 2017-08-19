<template>
  <div :class="$style.wrapper">
    <div :class="$style.zone">{{timeZone}}</div>
    <div :class="$style.date">{{time | formatDate('DD-MM-YY')}}</div>
    <div :class="$style.spacer"></div>
    <div :class="$style.time">{{time | formatDate('HH:mm')}}</div>
  </div>
</template>

<script>
  import moment from 'moment-timezone';

  export default {
    props: {
      widget: {
        type: Object,
        required: true,
      }
    },

    computed: {
      timeZone() {
        const timeZone = this.widget.options.timeZone || moment.tz.guess();
        return timeZone.split('/')[1];
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
      }, this.widget.options.refreshRate);
    },

    beforeDestroy() {
      if (this.interval) {
        window.clearInterval(this.interval);
      }
    },

    filters: {
      formatDate(date, format) {
        return moment(date).format(format);
      }
    }
  };
</script>

<style lang="scss" module>
  .wrapper {
    border: 10px solid var(--color-secondary);
    padding: 24px 32px;
    color: var(--color-secondary);
    background-color: var(--color-light);
    display: flex;
    flex-direction: column;
  }

  .zone {
    text-transform: uppercase;
    font-size: 36px;
    font-weight: bold;
  }

  .date {
    font-size: 48px;
    font-weight: bold;
  }

  .spacer {
    flex: 1;
  }

  .time {
    font-size: 96px;
    font-weight: bold;
  }
</style>
