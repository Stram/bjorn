<template lang="html">
  <admin-layout>
    <dashboard-preview
      :dashboard="dashboard"
      :size="dashboardSize"
    />
  </admin-layout>
</template>

<script>
import AdminLayout from 'components/layouts/Admin.vue';
import DashboardPreview from 'components/admin/DashboardPreview.vue';

import Dashboard from 'models/Dashboard';

export default {
  components: {
    AdminLayout,
    DashboardPreview
  },

  computed: {
    dashboard() {
      const dashboards = this.$store.getters['admin/dashboards'];
      console.log('dashboards ', dashboards, dashboards.find(({ uid }) => { console.log(uid); return uid === this.$route.params.dashboardId }));
      return dashboards.find(({ uid }) => uid === this.$route.params.dashboardId);
    },

    dashboardSize() {
      const windowWidth = this.$store.state.ui.windowWidth;
      const sideMargin = 64;
      const width = windowWidth - 2 * sideMargin;
      const aspectRation = 1024 / 1920;
      const height = aspectRation * width;
      return {
        width: Math.round(width),
        height: Math.round(height),
      };
    }
  },
}
</script>

<style lang="scss" module>

</style>
