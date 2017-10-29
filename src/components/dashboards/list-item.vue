<template>
  <div :class="$style.wrapper">
    <div :class="$style.block">

    </div>

    <div :class="$style.text">
      <router-link
        :to="{name: 'admin.dashboards', params: {dashboardId: dashboard.id}}"
        :class="$style.name"
      >
        {{dashboard.name}}
      </router-link>
      <div :class="$style.updated"> {{dashboard.updatedAt}} </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      dashboard: {
        type: Object,
        required: true
      }
    }
  };
</script>

<style lang="scss" module>
  .wrapper {
    padding: 24px 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .block {
    width: var(--dashboards-list-block-size);
    height: var(--dashboards-list-block-size);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 8px solid var(--color-light);
  }

  .text {
    margin-left: 32px;
  }

  .name {
    color: var(--color-light);
    font-size: 36px;
    font-weight: bold;
    text-decoration: none;

    transition: transform 150ms ease-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  .updated-at {
    margin-top: 8px;
    color: var(--color-light);
    font-size: 18px;
  }
</style>
