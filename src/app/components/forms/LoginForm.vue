<template lang="html">
  <form-wrapper :form="form">
    Ovo je login forma
    <button type="submit">
      CLICK ME
    </button>
  </form-wrapper>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  import LoginForm from 'app/forms/LoginForm';
  import FormWrapper from 'app/components/forms/FormWrapper.vue';
  import FormInput from 'app/components/forms/FormInput.vue';

  @Component({
    components: {
      FormWrapper,
      FormInput
    }
  })
  export default class LoginFormComponent extends Vue {
    @Prop({type: LoginForm, required: true})
    form: LoginForm
  }
</script>

<style lang="scss" module>

</style>
