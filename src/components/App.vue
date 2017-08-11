<template lang="html">
  <main :id="config.APP_ROOT_ID">
    <router-view></router-view>  
    <transition name="fade">
      <loading-curtain
        v-if="showLoadingCurtain"
      />
    </transition>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import { APP_ROOT_ID } from 'config';
  import LoadingCurtain from 'components/utils/LoadingCurtain.vue';

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

<style lang="scss">
  
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

</style>
