<template lang="html">
  <div>
    <input
      :type="type"
      :disabled="disabled"
      :value="value"
      @input="updateValue"
    />
    <span
      v-if="!field.isValid"
    >
      Imas error
    </span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  import {FormField} from 'services/form-object';

  @Component({
    props: {
      type: {
        type: String,
        default: 'text',
      },

      disabled: {
        type: Boolean,
        default: false,
      }
    }
  })
  export default class FormInput extends Vue {
    @Prop({type: FormField, required: true})
    private field: FormField;

    get value() {
      return this.field.value;
    }

    updateValue(event: any) {
      this.field.value = event.target.value;
    }
  }
</script>

<style lang="scss" module>

</style>
