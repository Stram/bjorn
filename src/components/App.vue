<template lang="html">
  <main>
    <transition name="fade">
      <loading-curtain
        v-if="showLoadingCurtain"
      />
      <router-view v-else></router-view>
    </transition>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import LoadingCurtain from 'components/utils/LoadingCurtain.vue';

  @Component({
    components: {
      LoadingCurtain,
    }
  })
  export default class App extends Vue {
    get showLoadingCurtain() {
      return this.$store.getters['isLoading'];
    }
  }
</script>
