<template>
  <app-modal
    title="Edit widget options"
    @close="onModalClose"
  >
    <component
      :is="optionsComponent"
      :widget-options="widget.options || {}"
      @cancel="onFormCancel"
      @widget:save-new-options="onSaveNewOptions"
    />
  </app-modal>
</template>

<script>
  import AppModal from 'components/utils/Modal.vue';
  import InlineSVG from 'components/utils/InlineSVG.vue';

  import {pages} from 'router';
  import widgets from 'enums/widgets';
  import {error} from 'services/logger';
  import * as mutationTypes from 'store/mutation-types';

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
        this.$store.commit(`admin/${mutationTypes.SET_WIDGET_OPTIONS}`, {widgetId: this.widget.id, options});
        this.$store.dispatch('admin/saveWidget', this.widget);
      }
    }
  };
</script>

<style lang="scss" module>

</style>
