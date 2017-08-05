<template lang="html">
    <admin-layout>
      <dashboard-preview
        :dashboard="dashboard"
      />
    </admin-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { AdminLayout, DashboardPreview } from 'app/components';

import Dashboard from 'app/models/Dashboard';

@Component({
  components: {
    AdminLayout,
    DashboardPreview
  }
})
export default class AdminDashboardPage extends Vue {

  get dashboard() {
    const dashboards: Array<Dashboard> = this.$store.getters['admin/dashboards'];
    return dashboards.find(({uid}) => uid === this.$route.params.dashboardId);
  }

  mounted() {
    this.$store.dispatch('admin/startDashboardSync', this.$route.params.dashboardId).then(() => {
      
    });
  }
}
</script>

<style lang="scss" module>

</style>
