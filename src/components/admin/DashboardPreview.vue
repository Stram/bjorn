<template>
  <section
    ref="container"
    :class="$style.container"
    :style="{
      gridTemplateColumns: `repeat(${dashboard.width}, 1fr)`,
      gridTemplateRows: `repeat(${dashboard.height}, 1fr)`,
      gridGap: `${gridGapSize}px`,
      borderSize: `${containerBorderSize}px`,
      padding: `${containerPaddingSize}px`,
    }"
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
      <div
        v-for="direction in directions"
        :key="direction"
        :class="[$style.handle, $style[direction]]"
        :draggable="true"
        @drag="onHandleDrag(widget, direction, $event)"
        @dragEnd="onHandleDragEnd(widget, direction, $event)"
      ></div>
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
  import {uuid} from 'utils';
  import * as plusIcon from 'images/plus.svg';

  function createArray(n) {
    return Array.from({length: n});
  }

  const EMPTY_TYPE = 'empty';

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
      widgetSlots() {
        const {height, width} = this.dashboard;
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

        return slots;
      },

      emptyWidgets() {
        const dashboard = this.dashboard;
        const {height, width} = dashboard;

        return createArray(width * height).reduce((accumulator, current, index) => {
          const x = index % width;
          const y = Math.floor(index / width);
          if (this.widgetSlots[x][y] === EMPTY_TYPE) {
            accumulator.push({x, y, id: `empty-${uuid()}`});
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
      },

      onHandleDrag(widget, direction, event) {
        const {width, height} = this.getWidgetSize();
        const {offsetX, offsetY} = event;
        const isVerticalExpand = direction === this.directions.NORTH || direction === this.directions.SOUTH;
        const offset = isVerticalExpand ? offsetY : offsetX;
        const widgetSize = isVerticalExpand ? height : width;
        const invertedOffset = direction === this.directions.NORTH || direction === this.directions.WEST;
        const totalOffset = invertedOffset ? -offset : offset;
        const mathFunction = totalOffset > 0 ? 'floor' : 'ceil';
        const amount = Math[mathFunction](totalOffset / (this.gridGapSize + widgetSize / 2));
        if (amount !== 0) {
          this.expandWidget(widget, direction, amount);
        }
      },

      onHandleDragEnd(widget) {
        this.$emit('widget:save', widget);
      },

      getWidgetSize() {
        const containerElem = this.$refs.container;
        const {width: gridWidth, height: gridHeight} = containerElem.getBoundingClientRect();
        const gridTotalGapWidth = (this.dashboard.width - 1) * this.gridGapSize;
        const gridTotalGapHeight = (this.dashboard.height - 1) * this.gridGapSize;
        const outsideSpace = 2 * this.containerBorderSize + 2 * this.containerPaddingSize;

        return {
          width: (gridWidth - outsideSpace - gridTotalGapWidth) / this.dashboard.width,
          height: (gridHeight - outsideSpace - gridTotalGapHeight) / this.dashboard.height
        };
      },

      canExpand(widget, direction, amount) {
        const {x, y, width, height} = widget;
        const isVerticalExpansion = direction === this.directions.NORTH || direction === this.directions.SOUTH;

        if (amount < 0) {
          return isVerticalExpansion ? -amount < widget.height : -amount < widget.width;
        }

        const arrayX = isVerticalExpansion ? createArray(width) : createArray(amount);
        const arrayY = isVerticalExpansion ? createArray(amount) : createArray(height);

        return arrayX.reduce((accumulatorX, valueX, offsetX) => {
          return accumulatorX && arrayY.reduce((accumulatorY, valueY, offsetY) => {
            if (direction === this.directions.NORTH) {
              return accumulatorY &&
              this.widgetSlots[x + offsetX] &&
              this.widgetSlots[x + offsetX][y - offsetY - 1] === EMPTY_TYPE;
            } else if (direction === this.directions.SOUTH) {
              return accumulatorY &&
              this.widgetSlots[x + offsetX] &&
              this.widgetSlots[x + offsetX][y + offsetY + height] === EMPTY_TYPE;
            } else if (direction === this.directions.EAST) {
              return accumulatorY &&
              this.widgetSlots[x + offsetX + width] &&
              this.widgetSlots[x + offsetX + width][y + offsetY] === EMPTY_TYPE;
            } else if (direction === this.directions.WEST) {
              return accumulatorY &&
              this.widgetSlots[x - offsetX - 1] &&
              this.widgetSlots[x - offsetX - 1][y + offsetY] === EMPTY_TYPE;
            }
            return false;
          }, true);
        }, true);
      },

      expandWidget(widget, direction, amount) {
        const canExpand = this.canExpand(widget, direction, amount);
        if (canExpand) {
          const size = {};
          switch (direction) {
            case this.directions.NORTH:
              size.y = widget.y - amount;
            case this.directions.SOUTH:
              size.height = widget.height + amount;
              break;
            case this.directions.WEST:
              size.x = widget.x - amount;
            case this.directions.EAST:
              size.width = widget.width + amount;
              break;
          }

          this.$emit('widget:update-size', {
            widgetId: widget.id,
            size
          });
        }
      }
    },

    data() {
      return {
        plusIcon,
        widgetTypes,
        directions: {
          NORTH: 'north',
          EAST: 'east',
          SOUTH: 'south',
          WEST: 'west'
        },
        containerBorderSize: 5,
        containerPaddingSize: 20,
        gridGapSize: 24
      };
    }
  };
</script>

<style lang="scss" module>
  @import 'mixins';
  $transition-speed: 150ms;

  .container {
    display: grid;
    align-items: stretch;
    justify-content: stretch;
    border-style: solid;
    border-color: var(--color-secondary);
    height: 100%;
  }

  .widget {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 5px solid var(--color-secondary);
    transition: border-color $transition-speed;
    position: relative;

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

  .handle {
    position: absolute;

    &.north,
    &.south {
      height: 5px;
      cursor: ns-resize;
    }

    &.east,
    &.west {
      width: 5px;
      cursor: ew-resize;
    }

    &.north {
      @include strech(absolute, -5, 0, auto, 0);
    }

    &.east {
      @include strech(absolute, 0, -5, 0, auto);
    }

    &.south {
      @include strech(absolute, auto, 0, -5, 0);
    }

    &.west {
      @include strech(absolute, 0, auto, 0, -5);
    }
  }

  .icon {
    @include svg {
      fill: var(--color-secondary);
      transition: fill $transition-speed;
    }
  }
</style>
