<template lang="html">
  <div :class="$style.curtain">
    <app-spinner />
  </div>
</template>

<script>
  import AppSpinner from 'components/utils/Spinner.vue';

  export default {
    components: {
      AppSpinner
    }
  };
</script>

<style lang="scss" module>
  @import 'mixins';

  .curtain {
    @include stretch();
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-primary);
  }
</style>
