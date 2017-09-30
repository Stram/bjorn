<template>
  <dashboards-list
    :dashboards="dashboards"
  />
</template>

<script>
  import DashboardsList from 'components/dashboards/list';

  import Dashboard from 'models/Dashboard';
  import {pages} from 'router';

  export default {
    components: {
      DashboardsList
    },

    computed: {
      dashboards() {
        return this.$store.getters.dashboards;
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
