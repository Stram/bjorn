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
        :style="{
          gridColumn: `${widget.x + 1} / span ${widget.width}`,
          gridRow: `${widget.y + 1} / span ${widget.height}`
        }"
      />
    </div>
  </section>
</template>

<script>
  import ClockWidget from 'components/widgets/clock/Widget.vue';
  import NewsletterWidget from 'components/widgets/newsletter/Widget.vue';

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
          clock: ClockWidget,
          newsletter: NewsletterWidget,
        };
      }
    }
  };
</script>

<style lang="scss" module>
  .grid {
    display: grid;
    grid-gap: 24px;
    align-items: stretch;
    justify-content: stretch;

    height: 100vh;
    width: 100vw;
    min-width: 0;
    min-height: 0;
    padding: 32px 24px;
    background-color: var(--color-primary);
  }
</style>
