<template lang="html">
  <div :class="$style.curtain">
     <app-spinner /> 
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import AppSpinner from 'app/components/utils/Spinner.vue';

  @Component({
    components: {
      AppSpinner,
    }
  })
  export default class LoadingCurtain extends Vue {

  }
</script>

<style lang="scss" module>

.curtain {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
