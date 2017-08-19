<template>
  <app-modal
    title="Select widget type"
    @close="onModalClose"
  >
    <div
      v-if="!type"
      :class="$style.wrapper"
    >
      <button
        v-for="widgetType in widgetTypesList"
        :key="widgetType.id"
        :class="$style.button"
        @click="onWidgetTypeClick(widgetType.id)"
      >
        <div :class="$style.iconWrapper">
          <inline-svg :src="widgetType.icon" />
        </div>
        <div :class="$style.name">
          {{widgetType.name}}
        </div>
      </button>
    </div>
    <component
      v-else
      :is="widgetTypes[type].optionsFormComponent"
      :widget-options="{}"
      @cancel="onFormCancel"
      @widget:save-new-options="onSaveNewOptions"
    />
  </app-modal>
</template>

<script>
  import AppModal from 'components/utils/Modal.vue';
  import InlineSVG from 'components/utils/InlineSVG.vue';

  import widgetTypes from 'enums/widgets';
  import {pages} from 'router';

  export default {
    components: {
      AppModal,
      'inline-svg': InlineSVG,
    },

    computed: {
      dashboard() {
        const dashboardId = this.$route.params.dashboardId;
        return this.$store.state.admin.dashboards.data[dashboardId];
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
          name: pages.ADMIN_DASHBOARD_INDEX
        });
      },

      onWidgetTypeClick(widgetTypeId) {
        this.type = widgetTypeId;
      },

      onSaveNewOptions(options) {
        const queryParams = this.$route.query;
        const x = parseInt(queryParams.x, 10);
        const y = parseInt(queryParams.y, 10);

        this.$store.dispatch('admin/createNewWidget', {
          x, y,
          width: 1,
          height: 1,
          type: this.type,
          options,
          dashboard: this.dashboard
        }).then(() => {
          this.close();
        });
      }
    },

    data() {
      return {
        type: '',
        widgetTypesList: Object.values(widgetTypes),
        widgetTypes,
      };
    },

    beforeRouteEnter(to, from, next) {
      const x = parseInt(to.query.x, 10);
      const y = parseInt(to.query.y, 10);
      if (Number.isNaN(x) || Number.isNaN(y) || x < 0 || y < 0) {
        next({
          name: pages.ADMIN_DASHBOARD_INDEX,
          params: {
            dashboardId: to.params.dashboardId
          }
        });
      } else {
        next();
      }
    }
  };
</script>

<style lang="scss" module>
  @import 'mixins';

  .wrapper {
    display: grid;
    grid-gap: 40px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 220px));
    grid-auto-rows: 150px;
    grid-auto-flow: row dense;
    justify-items: stretch;
    justify-content: space-around;
  }

  .button {
    border: 5px solid var(--color-light);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 16px;
    transition: background-color 150ms;

    &:focus,
    &:hover {
      background-color: var(--color-light);


      @include svg {
        fill: var(--color-secondary);
      }

      .name {
        color: var(--color-secondary);
      }
    }
  }

  .icon-wrapper {
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    @include svg {
      transition: fill 150ms;
      fill: var(--color-light);
    }
  }

  .name {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    margin-top: 16px;
    color: var(--color-light);
    transition: color 150ms;
  }
</style>
