<template>
  <app-modal
    title="Edit widget options"
    @close="onModalClose"
  >
    WIDGET OPTIONS
  </app-modal>
</template>

<script>
  import AppModal from 'components/utils/Modal.vue';
  import InlineSVG from 'components/utils/InlineSVG.vue';

  import {pages} from 'router';

  export default {
    components: {
      AppModal,
      'inline-svg': InlineSVG,
    },

    computed: {
      widget() {
        const widgetId = this.$route.params.widgetId;
        return this.$store.state.admin.widgets[widgetId];
      }
    },

    methods: {
      onModalClose() {
        this.close();
      },

      close() {
        this.$router.push({
          name: pages.ADMIN_DASHBOARD_WIDGET_INDEX
        });
      },
    }
  };
</script>

<style lang="scss" module>

</style>
