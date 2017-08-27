<template>
  <footer :class="$style.footer">
    <section :class="[$style.section, $style.dashboard]">
      <div v-if="dashboard">
        <h1 :class="$style.title">Dashboard</h1>
        <div :class="$style.name">{{dashboard.id}}</div>
      </div>
    </section>
    <section :class="[$style.section, $style.widget]">
      <template v-if="widget">
        <div :class="$style.widgetInfo">
          <h1 :class="$style.title">Widget</h1>
          <div :class="$style.type">{{widget.type}}</div>
        </div>
        <div :class="$style.widgetActions">
          <util-button
            :class="$style.widgetAction"
            :theme="buttonThemes.OUTLINE"
            @click="onWidgetChangeOptionsClick"
          >
            Change options
          </util-button>

          <util-button
            :class="$style.widgetAction"
            :theme="buttonThemes.OUTLINE"
            @click="onWidgetRemoveClick"
          >
            Remove
          </util-button>
        </div>
      </template>
    </section>
  </footer>
</template>

<script>
  import UtilButton from 'components/utils/Button';

  import buttonThemes from 'enums/button-themes';

  export default {
    components: {
      UtilButton
    },

    props: {
      dashboard: {},
      widget: {},
    },

    computed: {

    },

    methods: {
      onWidgetChangeOptionsClick() {
        this.$emit('widget:show-options');
      },

      onWidgetRemoveClick() {
        this.$emit('widget:remove');
      }
    },

    data() {
      return {
        buttonThemes
      };
    }
  };
</script>

<style lang="scss" module>
  .footer {
    display: flex;
  }

  .section {
    padding: 24px;
    display: flex;
  }

  .dashboard {
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--color-primary);
    min-width: 300px;

    .title {
      color: var(--color-secondary);
    }
  }

  .widget {
    flex: 1;
    background-color: var(--color-secondary);

    .title {
      color: var(--color-light);
    }
  }

  .widget-info {
    margin-right: 16px;
  }

  .title {
    font-size: 36px;
    font-weight: bold;
  }

  .name {
    font-size: 36px;
    color: var(--color-light);
  }

  .type {
    font-size: 24px;
    color: var(--color-light);
  }

  .widget-actions {
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  .widget-action {
    &:not(:last-child) {
      margin-right: 40px;
    }
  }
</style>
