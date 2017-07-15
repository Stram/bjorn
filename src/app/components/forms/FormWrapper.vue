<template lang="html">
  <form
    @submit.prevent="onSubmit"
  >
    <slot></slot>
  </form>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  import {Prop} from 'vue-property-decorator';

  import Form from 'app/forms/Form';

  @Component({})
  export default class FormWrapper extends Vue {
    @Prop({type: Object, required: true})
    private form: Form;

    onSubmit() {
      console.log(this.form);

      this.form.submit();
    }
  }
</script>

<style lang="scss" module>

</style>
