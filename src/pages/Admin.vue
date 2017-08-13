<template lang="html">
  <admin-layout>
    <empty-dashboard
      @dashboard:create="createNewDashboard"
    />
  </admin-layout>
</template>

<script>
  import AdminLayout from 'components/layouts/Admin.vue';
  import EmptyDashboard from 'components/admin/EmptyDashboard.vue';

  import Dashboard from 'models/Dashboard';
  import {pages} from 'router';

  export default {
    components: {
      AdminLayout,
      EmptyDashboard,
    },

    methods: {
      createNewDashboard() {
        this.$store.dispatch('admin/createNewDashboard', Dashboard.createEmpty()).then((dashboard) => {
          this.$router.push({
            name: pages.ADMIN_DASHBOARD_INDEX,
            params: {
              dashboardId: dashboard.id
            }
          });
        });
      }
    }
  };
</script>

<style lang="scss" module>

</style>
