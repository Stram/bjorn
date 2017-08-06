<template lang="html">
  <form
    @submit.prevent="onSubmit"
  >
    <slot></slot>
  </form>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  import { Form } from 'app/services/form-object';

  @Component({})
  export default class FormWrapper extends Vue {
    @Prop({type: Object, required: true})
    private form: Form;

    onSubmit() {
      this.form.submit();
    }
  }
</script>

<style lang="scss" module>

</style>
