<template lang="html">
  <form-wrapper :form="form">
    <form-submit
      :class="$style.submit"
      :form="form"
      label="Login"
    />
  </form-wrapper>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  import LoginForm from 'forms/LoginForm';
  import FormWrapper from 'components/forms/FormWrapper.vue';
  import FormSubmit from 'components/forms/FormSubmit.vue';

  @Component({
    components: {
      FormWrapper,
      FormSubmit,
    }
  })
  export default class LoginFormComponent extends Vue {
    @Prop({type: LoginForm, required: true})
    form: LoginForm
  }
</script>

<style lang="scss" module>
  .submit {
    background: var(--color-light);
    border: 5px solid var(--color-secondary);
    color: var(--color-secondary);

    font-size: 130px;
    line-height: 150px;
    padding: 20px 120px;
    font-weight: 900;
    text-transform: uppercase;
  }
</style>
