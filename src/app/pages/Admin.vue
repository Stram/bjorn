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
      this.$store.dispatch('admin/startDashboardSync');
    }
  }
</script>

<style lang="scss" module>

</style>
