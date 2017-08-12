<template>
  <app-modal
    title="Select widget type"
    @close="onModalClose"
  >
    <div>List of widget types</div>
  </app-modal>
</template>

<script>
import AppModal from 'components/utils/Modal.vue';

import { pages } from 'router';

export default {
  components: {
    AppModal,
  },

  methods: {
    onModalClose() {
      this.$router.push({
        name: pages.ADMIN_DASHBOARD_INDEX
      })
    }
  }
}
</script>

<style lang="scss" module>

</style>
