<template lang="html">
  <admin-layout>
    <empty-dashboard
      @dashboard:create="createNewDashboard"
    />
  </admin-layout>  
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import AdminLayout from 'app/components/layouts/Admin.vue';
  import EmptyDashboard from 'app/components/admin/EmptyDashboard.vue';
  import Dashboard from 'app/models/Dashboard';
  import { pages } from 'app/router';

  @Component({
    components: {
      AdminLayout,
      EmptyDashboard,
    }
  })
  export default class AdminPage extends Vue {

    mounted() {
      this.$store.dispatch('admin/startDashboardsSync').then(() => {
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

    createNewDashboard() {
      const newDashboard = new Dashboard({});
      this.$store.dispatch('admin/saveDashboard', newDashboard).then((response: any) => {
        console.log('response', response);
        this.$router.push({
          name: pages.DASHBOARD_INDEX,
          params: {
            dashboardId: response.key
          }
        });
      });
    }
  }
</script>

<style lang="scss" module>

</style>
