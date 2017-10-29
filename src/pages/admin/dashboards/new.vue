<template>
  <utils-modal
    title="Create new dashboard"
    @close="onModalClose"
  >
    Nesto
  </utils-modal>
</template>

<script>
  import UtilsModal from 'components/utils/Modal.vue';

  export default {
    components: {
      UtilsModal
    },

    methods: {
      onModalClose() {
        this.$router.push({
          name: 'admin.dashboards'
        });
      }
    }
  };
</script>

<style lang="scss" module>

</style>
