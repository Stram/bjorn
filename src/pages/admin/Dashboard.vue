<template lang="html">
  <admin-layout>
    <div
      ref="content"
      :class="$style.content"
    >
      <dashboard-resizer
        :size="dashboardSize"
        :margins="dashboardMargins"
      >
        <dashboard-preview
          :dashboard="dashboard"
          :widgets="widgets"
          :active-widget-id="activeWidget && activeWidget.id"
          @widget:update-size="onWidgetUpdateSize"
          @widget:save="onWidgetSave"
        />
      </dashboard-resizer>
    </div>

    <action-footer
      :dashboard="dashboard"
      :widget="activeWidget"
      @widget:show-options="onWidgetShowOptions"
      @widget:remove="onWidgetRemove"
    />

    <util-alert
      v-if="showRemoveAlert"
      message="Are you sure you want to remove this widget?"
      primary-action-label="Yes, remove it"
      secondary-action-label="No"
      @action:primary="onRemoveAlertPrimaryAction"
      @action:secondary="onRemoveAlertSecondaryAction"
    />
    <router-view></router-view>
  </admin-layout>
</template>

<script>
  import AdminLayout from 'components/layouts/Admin.vue';
  import ActionFooter from 'components/admin/ActionFooter.vue';
  import DashboardPreview from 'components/admin/DashboardPreview.vue';
  import DashboardResizer from 'components/admin/DashboardResizer.vue';
  import UtilAlert from 'components/utils/Alert.vue';

  import * as mutationTypes from 'store/mutation-types';
  import {pages} from 'router';

  export default {
    components: {
      AdminLayout,
      ActionFooter,
      DashboardPreview,
      DashboardResizer,
      UtilAlert
    },

    watch: {
      '$store.state.ui.windowHeight'() {
        this.setContentSizes();
      },

      '$store.state.ui.windowWidth'() {
        this.setContentSizes();
      }
    },

    computed: {
      dashboard() {
        const dashboardId = this.$route.params.dashboardId;
        return this.$store.state.admin.dashboards.data[dashboardId];
      },

      dashboardSize() {
        const {width, height} = this;
        return {
          width, height
        };
      },

      dashboardMargins() {
        return {
          top: 48,
          right: 64,
          bottom: 48,
          left: 64,
        };
      },

      widgets() {
        const dashboardWidgets = this.dashboard.widgets;
        return dashboardWidgets.map((widgetId) => this.$store.state.admin.widgets.data[widgetId]);
      },

      activeWidget() {
        const widgetId = this.$route.params.widgetId;
        return widgetId ? this.$store.state.admin.widgets.data[widgetId] : null;
      }
    },

    methods: {
      setContentSizes() {
        const {width, height} = this.$refs.content.getBoundingClientRect();
        this.width = width;
        this.height = height;
      },

      onWidgetShowOptions() {
        this.$router.push({
          name: pages.ADMIN_DASHBOARD_WIDGET_OPTIONS
        });
      },

      onWidgetUpdateSize(payload) {
        this.$store.commit(`admin/${mutationTypes.SET_WIDGET_SIZE}`, payload);
      },

      onWidgetSave(widget) {
        this.$store.dispatch('admin/saveWidget', widget);
      },

      onWidgetRemove() {
        this.showRemoveAlert = true;
      },

      onRemoveAlertPrimaryAction() {
        this.removeWidget();
        this.showRemoveAlert = false;
      },

      onRemoveAlertSecondaryAction() {
        this.showRemoveAlert = false;
      },

      removeWidget() {
        this.$store.dispatch('admin/removeWidget', this.activeWidget);
        this.$router.replace({
          name: pages.ADMIN_DASHBOARD_INDEX
        });
      }
    },

    data() {
      return {
        width: 0,
        height: 0,
        showRemoveAlert: false,
      };
    },

    mounted() {
      this.setContentSizes();
    }
  };
</script>

<style lang="scss" module>
  .content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
