<template>
  <h1>dashboards</h1>
</template>

<script>
  export default {
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
  }
</script>
