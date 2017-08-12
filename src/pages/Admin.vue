<template lang="html">
  <router-view>
    <admin-layout>
      <empty-dashboard
        @dashboard:create="createNewDashboard"
      />
    </admin-layout>  
  </router-view>
</template>

<script>
import AdminLayout from 'components/layouts/Admin.vue';
import EmptyDashboard from 'components/admin/EmptyDashboard.vue';
import Dashboard from 'models/Dashboard';
import { pages } from 'router';

export default {
  components: {
    AdminLayout,
    EmptyDashboard,
  },

  methods: {
    createNewDashboard() {
      const newDashboard = new Dashboard({});
      this.$store.dispatch('admin/saveDashboard', newDashboard).then((response) => {
        console.log('response', response);
        this.$router.push({
          name: pages.ADMIN_DASHBOARD_INDEX,
          params: {
            dashboardId: response.key
          }
        });
      });
    }
  }
}
</script>

<style lang="scss" module>

</style>
