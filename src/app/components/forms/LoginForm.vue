<template lang="html">
  <form-wrapper :form="form">
    Ovo je login forma
  </form-wrapper>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  import LoginForm from 'app/forms/LoginForm';
  import FormWrapper from 'app/components/forms/FormWrapper.vue';

  @Component({
    components: {
      FormWrapper
    }
  })
  export default class LoginFormComponent extends Vue {
    @Prop({type: LoginForm, required: true})
    form: LoginForm
  }
</script>

<style lang="scss" module>

</style>
