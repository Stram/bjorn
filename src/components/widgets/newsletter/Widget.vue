<template>
  <div :class="$style.wrapper">
    Newsletter
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    props: {
      widget: {
        type: Object,
        required: true,
      }
    },

    computed: {

    },

    methods: {

    },

    data() {
      return {
      };
    },

    filters: {
      formatDate(date, format) {
        return date.format(format);
      }
    }
  };
</script>

<style lang="scss" module>
  .wrapper {
    border: 10px solid var(--color-secondary);
    padding: 24px 32px;
    color: var(--color-secondary);
    background-color: var(--color-light);
    display: flex;
    flex-direction: column;
  }
</style>
