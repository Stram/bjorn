<template>
  <div :class="$style.wrapper">
    <dashboards-list-item
      v-for="dashboard in dashboards"
      :key="dashboard.id"
      :class="$style.item"
      :dashboard="dashboard"
    />

    <dashboards-list-item-new />
  </div>
</template>

<script>
  import dashboardsListItem from 'components/dashboards/list-item';
  import dashboardsListItemNew from 'components/dashboards/list-item-new';

  export default {
    components: {
      dashboardsListItem,
      dashboardsListItemNew
    },

    props: {
      dashboards: {
        type: Array,
        required: true
      }
    }
  };
</script>

<style lang="scss" module>
  .wrapper {
    margin: 0 130px;
  }

  .item {
    &:not(:first-child) {
      margin-top: 16px;
    }
  }
</style>
