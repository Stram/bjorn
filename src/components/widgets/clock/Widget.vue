<template>
  <div :class="$style.wrapper">
    <div :class="$style.zone">{{location}}</div>
    <div :class="$style.date">{{now | formatDate('DD-MM-YY')}}</div>
    <div :class="$style.spacer"></div>
    <div :class="$style.time">{{now | formatDate('HH:mm')}}</div>
  </div>
</template>

<script>
  import moment from 'moment-timezone';
  import refreshableMixin from 'mixins/refreshable';

  export default {
    mixins: [refreshableMixin],

    props: {
      widget: {
        type: Object,
        required: true,
      }
    },

    computed: {
      timeZone() {
        return this.widget.options.timeZone || moment.tz.guess();
      },

      location() {
        return this.timeZone.split('/')[1].replace('_', ' ');
      }
    },

    filters: {
      formatDate(date, format) {
        return date.format(format);
      }
    }
  };
</script>

<style lang="scss" module>
  .wrapper {
    border: 10px solid var(--color-primary);
    padding: 24px 32px;
    color: var(--color-primary);
    background-color: var(--color-light);
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
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
