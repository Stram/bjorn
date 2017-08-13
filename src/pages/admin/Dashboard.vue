<template lang="html">
  <admin-layout>
    <dashboard-preview
      :dashboard="dashboard"
      :widgets="widgets"
      :size="dashboardSize"
    />
    <router-view></router-view>
  </admin-layout>
</template>

<script>
  import AdminLayout from 'components/layouts/Admin.vue';
  import DashboardPreview from 'components/admin/DashboardPreview.vue';

  export default {
    components: {
      AdminLayout,
      DashboardPreview
    },

    computed: {
      dashboard() {
        const dashboardId = this.$route.params.dashboardId;
        return this.$store.state.admin.dashboards.data[dashboardId];
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
      },

      widgets() {
        const dashboardWidgets = this.dashboard.widgets;
        return dashboardWidgets.map((widgetId) => this.$store.state.admin.widgets.data[widgetId]);
      },
    },
  };
</script>

<style lang="scss" module>

</style>
