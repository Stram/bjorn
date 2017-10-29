<template>
  <router-link
    :to="{name: 'admin.dashboards.new'}"
    :class="$style.wrapper"
  >
    <div :class="$style.block">
      <utils-icons-plus :size="40" />
    </div>

    <div :class="$style.text">
      Create new dashboard
    </div>
  </router-link>
</template>

<script>
  import UtilsIconsPlus from 'components/utils/icons/plus';

  export default {
    components: {
      UtilsIconsPlus
    }
  };
</script>

<style lang="scss" module>
  @import 'mixins';

  .wrapper {
    padding: 24px 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: border-color 150ms ease-out;

    &:hover {
      .block {
        border-color: var(--color-secondary);
      }
    }
  }

  .block {
    @include flex;
    width: var(--dashboards-list-block-size);
    height: var(--dashboards-list-block-size);
    border: 8px dashed var(--color-light);
    transition: border-color 150ms ease-out;
  }

  .text {
    margin-left: 32px;
    color: var(--color-light);
    font-size: 36px;
    font-weight: bold;
  }
</style>
