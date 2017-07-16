<template lang="html">
  <form-wrapper :form="form">
    Ovo je login forma
    <form-input
      :field="form.fields.username"
    />
    <form-input
      :field="form.fields.password"
      type="password"
    />
    <form-submit
      :form="form"
      label="Log in"
    />
  </form-wrapper>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  import LoginForm from 'app/forms/LoginForm';
  import FormWrapper from 'app/components/forms/FormWrapper.vue';
  import FormInput from 'app/components/forms/FormInput.vue';
  import FormSubmit from 'app/components/forms/FormSubmit.vue';

  @Component({
    components: {
      FormWrapper,
      FormInput,
      FormSubmit
    }
  })
  export default class LoginFormComponent extends Vue {
    @Prop({type: LoginForm, required: true})
    form: LoginForm
  }
</script>

<style lang="scss" module>

</style>
