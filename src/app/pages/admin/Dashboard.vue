<template lang="html">
    <admin-layout>
      <h1>ADMIN DASHBOARD</h1>
    </admin-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { AdminLayout } from 'app/components';

@Component({
  components: {
    AdminLayout
  }
})
export default class AdminDashboardPage extends Vue {

  mounted() {
    this.$store.dispatch('admin/startDashboardSync', this.$route.params.dashboardId).then(() => {
      
    });
  }
}
</script>

<style lang="scss" module>

</style>
