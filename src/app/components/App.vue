<template lang="html">
  <main :id="config.APP_ROOT_ID">
    <router-view></router-view>  
    <loading-curtain
      v-if="showLoadingCurtain"
    />     
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import { APP_ROOT_ID } from 'app/config';
  import LoadingCurtain from 'app/components/utils/LoadingCurtain.vue';

  @Component({
    components: {
      LoadingCurtain,
    }
  })
  export default class App extends Vue {
    config = {
      APP_ROOT_ID
    }

    get showLoadingCurtain() {
      return this.$store.getters['isLoading'];
    }
  }
</script>

<style lang="scss" module>
  
</style>
