<template lang="html">
  <button
    :disabled="disabled"
    type="submit"
  >
    {{label}}
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  import {Form} from 'app/services/form-object';

  @Component({
    props: {
      form: {
        type: Object,
        required: true,
      },

      label: {
        type: String,
        required: true,
      }
    }
  })
  export default class FormSubmit extends Vue {
    @Prop({type: Object, required: true})
    private form: Form;

    get disabled() {
      return !this.form.isValid;
    }
  }
</script>

<style lang="scss" module>

</style>
