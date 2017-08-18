<template>
  <app-modal
    title="Edit widget options"
    @close="onModalClose"
  >
    <component
      :is="optionsComponent"
      :widgetOptions="widget.options || {}"
      @cancel="onFormCancel"
      @widget:saveNewOptions="onSaveNewOptions"
    />
  </app-modal>
</template>

<script>
  import AppModal from 'components/utils/Modal.vue';
  import InlineSVG from 'components/utils/InlineSVG.vue';

  import {pages} from 'router';
  import widgets from 'enums/widgets';
  import {error} from 'services/logger';

  export default {
    components: {
      AppModal,
      'inline-svg': InlineSVG,
    },

    computed: {
      widget() {
        const widgetId = this.$route.params.widgetId;
        return this.$store.state.admin.widgets.data[widgetId];
      },

      optionsComponent() {
        const widgetOptions = widgets[this.widget.type];
        if (widgetOptions) {
          return widgetOptions.optionsFormComponent;
        }
        error('Unsupported widget type: ', this.widget.type);
        return null;
      }
    },

    methods: {
      onModalClose() {
        this.close();
      },

      onFormCancel() {
        this.close();
      },

      close() {
        this.$router.push({
          name: pages.ADMIN_DASHBOARD_WIDGET_INDEX
        });
      },

      onSaveNewOptions(options) {
        console.log('new options', options);
      }
    }
  };
</script>

<style lang="scss" module>

</style>
