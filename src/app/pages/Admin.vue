<template lang="html">
    <admin-layout>
      <h1>ADMIN</h1>
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
  export default class AdminPage extends Vue {

    mounted() {
      this.$store.dispatch('admin/startDashboardSync');
    }
  }
</script>

<style lang="scss" module>

</style>
