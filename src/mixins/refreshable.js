import moment from 'moment-timezone';

export default {
  methods: {
    getCurrentDate() {
      return this.timeZone ? moment.tz(this.timeZone) : moment();
    }
  },

  mounted() {
    const refreshRate = Math.round(parseFloat(this.widget.options.refreshRate) * 1000);
    this.now = this.getCurrentDate();
    this.interval = window.setInterval(() => {
      this.now = this.getCurrentDate();
    }, refreshRate);
  },

  beforeDestroy() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  },

  data() {
    return {
      now: this.getCurrentDate(),
      interval: null,
    };
  }
};
