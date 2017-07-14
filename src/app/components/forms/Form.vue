<template lang="html">
  <form
    @submit.prevent="onSubmit"
  >
    <slot />
  </form>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import Form from 'app/forms/Form';

  @Component({})
  export default class FormComponent extends Vue {
    @Prop({required: true})
    private form: Form

    onSubmit() {
      this.form.submit();
    }
  }
</script>

<style lang="scss" module>

</style>
