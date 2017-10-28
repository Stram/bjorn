<template>
  <dashboards-list
    v-if="isListLayout"
    :dashboards="dashboards"
  />

  <dashboards-grid
    v-else
    :dashboards="dashboards"
  >
</template>

<script>
  import DashboardsList from 'components/dashboards/list';
  import DashboardsGrid from 'components/dashboards/grid';

  import DashboardsLayoutEnum from 'enums/dashboards-layout';
  import Dashboard from 'models/Dashboard';
  import {pages} from 'router';

  export default {
    components: {
      DashboardsList,
      DashboardsGrid
    },

    computed: {
      dashboards() {
        return this.$store.getters.dashboards;
      }

      dashboardsLayout() {
        return this.$store.state.ui.dashboardsLayout;
      },

      isListLayout() {
        return this.dashboardsLayout === DashboardsLayoutEnum.LIST;
      }
    },

    methods: {
      createNewDashboard() {
        this.$store.dispatch('admin/createNewDashboard', Dashboard.createEmpty()).then((dashboard) => {
          this.$router.push({
            name: pages.DASHBOARD,
            params: {
              dashboardId: dashboard.id
            }
          });
        });
      }
    }
  };
</script>
