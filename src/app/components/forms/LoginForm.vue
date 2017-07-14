<template lang="html">
  <Form :form="form">
    Ovo je login forma
  </Form>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import LoginForm from 'app/forms/LoginForm';
  import Form from 'app/components/forms/Form.vue';

  @Component({
    components: {
      Form
    }
  })
  export default class LoginFormComponent extends Vue {
    @Prop({type: LoginForm, required: true})
    form: LoginForm
  }
</script>

<style lang="scss" module>

</style>
