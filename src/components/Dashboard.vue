<template>
  <section>
    <div
      :class="$style.grid"
      :style="gridStyle"
    >
      <component
        v-for="widget in widgets"
        :key="widget.id"
        :is="widgetComponents[widget.type]"
        :widget="widget"
      />
    </div>
  </section>
</template>

<script>
  import ClockWidget from 'components/widgets/clock/Widget.vue';

  export default {
    props: {
      dashboard: {
        type: Object,
        required: true
      },

      widgets: {
        type: Array,
        required: true
      }
    },

    computed: {
      gridStyle() {
        const dashboard = this.dashboard;

        return {
          gridTemplateColumns: `repeat(${dashboard.width}, 1fr)`,
          gridTemplateRows: `repeat(${dashboard.height}, 1fr)`,
        };
      },

      widgetComponents() {
        return {
          clock: ClockWidget
        };
      }
    }
  };
</script>

<style lang="scss" module>
  $vertical-spacing: 32px;
  $horizontal-spacing: 24px;

  .grid {
    display: grid;
    grid-gap: 24px;
    align-items: stretch;
    justify-content: stretch;

    height: calc(100vh - #{2 * $vertical-spacing});
    width: calc(100vw - #{2 * $horizontal-spacing});
    padding: 20px;
    margin: 32px 24px;
  }
</style>
