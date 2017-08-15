<template lang="html">
  <h1>
    OPTIONS
  </h1>
</template>

<script>
  export default {
    props: {
      widgetOptions: {
        type: Object,
        required: true,
      }
    },

    computed: {

    },

    methods: {
      submit() {
        this.$emit('widget:saveNewOptions', this.options);
      }
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
