<template>
  <section
    :class="$style.container"
    :style="gridStyle"
  >
    <button
      v-for="widget in widgets"
      :key="widget.id"
      :style="{
        gridColumn: `${widget.x + 1} / span ${widget.width}`,
        gridRow: `${widget.y + 1} / span ${widget.height}`
      }"
      :class="[$style.widget, {[$style.active]: widget && widget.id === activeWidgetId}]"
      @click="onWidgetClick(widget)"
    >
      <inline-svg :src="widgetTypes[widget.type].icon" :class="$style.icon" />
    </button>

    <button
      v-for="widget in emptyWidgets"
      :key="widget.id"
      :style="{
        gridColumn: `${widget.x + 1} / span 1`,
        gridRow: `${widget.y + 1} / span 1`
      }"
      :class="[$style.widget, $style.empty]"
      @click="onEmptyWidgetClick(widget)"
    >
      <inline-svg :src="plusIcon" :class="$style.icon" />
    </button>
  </section>
</template>

<script>
  import InlineSVG from 'components/utils/InlineSVG.vue';

  import {pages} from 'router';
  import widgetTypes from 'enums/widgets';
  import * as plusIcon from 'images/plus.svg';

  function createArray(n) {
    return Array.from({length: n});
  }

  export default {
    components: {
      'inline-svg': InlineSVG,
    },

    props: {
      dashboard: {
        type: Object,
        required: true,
      },

      widgets: {
        type: Array,
        required: true,
      },

      activeWidgetId: {
        type: String
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

      emptyWidgets() {
        const EMPTY_TYPE = 'empty';
        const dashboard = this.dashboard;
        const {height, width} = dashboard;

        const slots = createArray(width).reduce((accumulatorX, currentX, x) => {
          accumulatorX[x] = createArray(height).reduce((accumulatorY, currentY, y) => {
            accumulatorY[y] = EMPTY_TYPE;
            return accumulatorY;
          }, {});
          return accumulatorX;
        }, {});

        this.widgets.forEach((widget) => {
          const {x, y, type} = widget;
          createArray(widget.width).forEach((valueX, offsetX) => {
            createArray(widget.height).forEach((valueY, offsetY) => {
              slots[x + offsetX][y + offsetY] = type;
            });
          });
        });

        return createArray(width * height).reduce((accumulator, current, index) => {
          const x = index % width;
          const y = Math.floor(index / width);
          if (slots[x][y] === EMPTY_TYPE) {
            accumulator.push({x, y, id: `empty-${y * width + height}`});
          }
          return accumulator;
        }, []);
      }
    },

    methods: {
      onWidgetClick(widget) {
        this.$router.push({
          name: pages.ADMIN_DASHBOARD_WIDGET_INDEX,
          params: {
            widgetId: widget.id
          }
        });
      },

      onEmptyWidgetClick(widget) {
        this.$router.push({
          name: pages.ADMIN_WIDGET_NEW,
          query: {
            x: widget.x.toString(),
            y: widget.y.toString(),
          }
        });
      }
    },

    data() {
      return {
        plusIcon,
        widgetTypes,
      };
    }
  };
</script>

<style lang="scss" module>
  @import 'mixins';
  $transition-speed: 150ms;

  .container {
    display: grid;
    grid-gap: 24px;
    align-items: stretch;
    justify-content: stretch;
    padding: 20px;
    border: 5px solid var(--color-secondary);
    height: 100%;
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
        @include svg {
          fill: var(--color-primary);
        }
      }
    }

    &.active {
      background-color: var(--color-secondary);

      &:hover {
        border-color: var(--color-secondary);
      }

      .icon {
        @include svg {
          fill: var(--color-light);
        }
      }
    }
  }

  .icon {
    @include svg {
      fill: var(--color-secondary);
      transition: fill $transition-speed;
    }
  }
</style>
