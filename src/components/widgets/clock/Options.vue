<template lang="html">
  <vue-form
    :state="form"
    @submit.prevent="onFormSubmit"
  >
    <input-field
      v-model="options.timeZone"
      label="Time zone"
      field-name="timeZone"
      :state="form"
      :required="true"
    />

    <input-field
      v-model="options.refreshRate"
      label="Refresh rate"
      field-name="refreshRate"
      sufix="seconds"
      type="number"
      :state="form"
      :required="true"
    />

    <options-actions
      :disabled="form.$invalid"
      @cancel="onFormCancel"
    />
  </vue-form>
</template>

<script>
  import optionsMixin from 'mixins/options-form';

  export default {
    mixins: [optionsMixin],

    data() {
      return {
        options: {
          timeZone: this.widgetOptions.timeZone || '',
          refreshRate: parseFloat(this.widgetOptions.refreshRate) || ''
        }
      };
    }
  };
</script>
