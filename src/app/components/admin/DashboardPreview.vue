<template>
  <section
    :class="$style.container"
    :style="gridStyle"
  >
    <button
      v-for="widget in widgetsStructure"
      :key="widget.uid"
      :style="{
        gridColumn: `${widget.x + 1} / span ${widget.width}`,
        gridRow: `${widget.y + 1} / span ${widget.height}`
      }"
      :class="[$style.widget, {
        [$style.empty]: widget.type === 'empty'
      }]"
      @click="onWidgetClick(widget)"
    >
      <inline-svg :src="plusIcon" :class="$style.icon" />
    </button>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import { times } from 'lodash';

  import InlineSVG from 'app/components/utils/InlineSVG.vue';
  import Dashboard from 'app/models/Dashboard';
  import Widget from 'app/models/Widget';

  import * as plusIcon from 'images/plus.svg';

  @Component({
    components: {
      'inline-svg': InlineSVG,
    }
  })
  export default class DashboardPreview extends Vue {
    plusIcon = plusIcon

    @Prop({type: Object, required: true})
    private dashboard: Dashboard;

    @Prop({type: Object, required: true})
    private size: {width: number, height: number};

    get gridStyle() {
      const dashboard = this.dashboard;

      return {
        gridTemplateColumns: `repeat(${dashboard.width}, 1fr)`,
        gridTemplateRows: `repeat(${dashboard.height}, 1fr)`,
        width: `${this.size.width}px`,
        height: `${this.size.height}px`,
      }
    }

    get widgetsStructure() {
      const dashboard = this.dashboard;
      const widgets: Array<Widget> = [];
      times(dashboard.height, (y) => {
        times(dashboard.width, (x) => {
          widgets.push(new Widget({
            // FIXME
            x, y, type: 'empty', width: 1, height: 1, uid: `rand-${y * dashboard.width + x}`
          }));
        });
      });

      return widgets;
    }

    onWidgetClick(widget: Widget) {
      if (widget.type === 'empty') {

      }
    }
  }
</script>

<style lang="scss" module>
  @import 'mixins';
  $transition-speed: 150ms;

  .container {
    display: grid;
    grid-gap: 24px;
    align-items: stretch;
    justify-content: stretch;
    margin: 48px 64px;
    padding: 20px;
    border: 5px solid var(--color-secondary);
  }

  .widget {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 5px solid var(--color-secondary);
    transition: border-color $transition-speed;

    &.empty {
      border-style: dashed;
    }

    &:hover {
      border-color: var(--color-primary);

      .icon {
        @include svg() {
          fill: var(--color-primary);
        }
      }
    }
  }

  .icon {
    @include svg() {
      fill: var(--color-secondary);
      transition: fill $transition-speed;
    }
  }
</style>
