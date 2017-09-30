<template>
  <div>
    <dashboards-list-item
      v-for="dashboard in dashboards"
      :key="dashboard.id"
      :dashboard="dashboard"
    />
  </div>
</template>

<script>
  import dashboardsListItem from 'components/dashboards/item';

  export default {
    components: {
      dashboardsListItem
    },

    props: {
      dashboards: {
        type: Array,
        required: true
      }
    }
  };
</script>
