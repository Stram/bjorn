<template lang="html">
    <admin-layout>
      <empty-dashboard />
    </admin-layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import { AdminLayout, EmptyDashboard } from 'app/components';

  import Dashboard from 'app/models/Dashboard';
  import { pages } from 'app/router';

  @Component({
    components: {
      AdminLayout,
      EmptyDashboard
    }
  })
  export default class AdminPage extends Vue {

    mounted() {
      this.$store.dispatch('admin/startDashboardSync').then(() => {
        const dashboards = this.$store.getters['admin/dashboards'] as Array<Dashboard>;
        if (dashboards.length) {
          this.$router.push({
            name: pages.DASHBOARD_INDEX,
            params: {
              dashboardId: dashboards[0].uid
            }
          })
        }
      });
    }
  }
</script>

<style lang="scss" module>

</style>
