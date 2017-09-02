<template lang="html">
  <main>
    <transition name="fade">
      <loading-curtain
        v-if="showLoadingCurtain"
      />
      <router-view v-else></router-view>
    </transition>
    <portal-target name="modal"></portal-target>
    <portal-target name="alert"></portal-target>
  </main>
</template>

<script>
  import LoadingCurtain from 'components/utils/LoadingCurtain.vue';

  export default {
    components: {
      LoadingCurtain,
    },

    computed: {
      showLoadingCurtain() {
        return this.$store.state.isLoading;
      }
    },
  };
</script>
