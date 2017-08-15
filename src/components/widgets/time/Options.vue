<template lang="html">
  <h1>
    OPTIONS
  </h1>
</template>

<script>
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
        time: new Date(),
        interval: null,
      };
    }
  };
</script>

<style lang="scss" module>

</style>
