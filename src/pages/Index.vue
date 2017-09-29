<template>
  <dashboard
    :dashboard="activeDashboard"
    :widgets="widgets"
  />
</template>

<script>
  import Dashboard from 'components/Dashboard.vue';

  export default {
    components: {
      Dashboard
    },

    computed: {
      dashboards() {
        return this.$store.getters.dashboards;
      },

      widgets() {
        return this.$store.getters.widgets;
      },

      activeDashboard() {
        return this.dashboards && this.dashboards.length && this.dashboards[0];
      }
    }
  };
</script>

<style lang="scss" module>

</style>
