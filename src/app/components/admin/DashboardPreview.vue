<template>
  <section
    :class="$style.container"
    :style="gridStyle"
  >
    <div
      v-for="widget in widgetsStructure"
      :key="widget.uid"
      :style="{
        gridColumn: `${widget.x + 1} / span ${widget.width}`,
        gridRow: `${widget.y + 1} / span ${widget.height}`
      }"
    >
      Ono je prazan widget
    </div>

  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import { times } from 'lodash';

  import Dashboard from 'app/models/Dashboard';
  import Widget from 'app/models/Widget';

  @Component({})
  export default class DashboardPreview extends Vue {
    @Prop({type: Object, required: true})
    private dashboard: Dashboard;

    get gridStyle() {
      const dashboard = this.dashboard;

      return `
        grid-template-columns: repeat(${dashboard.width}, 1fr);
        grid-template-rows: repeat(${dashboard.height}, 1fr);
      `;
    }

    get widgetsStructure() {
      const dashboard = this.dashboard;
      const widgets: Array<Widget> = [];
      times(dashboard.height, (y) => {
        times(dashboard.width, (x) => {
          widgets.push(new Widget({
            x, y, type: 'empty', width: 1, height: 1, uid: `rand-${y * dashboard.width + x}`
          }));
        });
      });

      return widgets;
    }

    onCreateClick() {
      this.$emit('dashboard:create');
    }
  }
</script>

<style lang="scss" module>
  .container {
    flex: 1;
    display: grid;
    grid-gap: 10px;
    align-items: stretch;
    justify-content: stretch;
    margin: 48px 64px;
    border: 5px solid var(--color-secondary);
  }
</style>
