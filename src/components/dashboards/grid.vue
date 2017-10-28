<template>
  <div>
    <dashboards-grid-item
      v-for="dashboard in dashboards"
      :key="dashboard.id"
      :dashboard="dashboard"
    />
  </div>
</template>

<script>
  import dashboardsGridItem from 'components/dashboards/grid-item';

  export default {
    components: {
      dashboardsGridItem
    },

    props: {
      dashboards: {
        type: Array,
        required: true
      }
    }
  };
</script>
