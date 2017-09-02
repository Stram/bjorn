<template>
  <vue-form
    :state="form"
    @submit.prevent="onFormSubmit"
  >
    <input-field
      v-model="options.subscribersNumber"
      label="Number of subscribers"
      field-name="subscribersNumber"
      type="number"
      :state="form"
      :required="true"
    />

    <input-field
      v-model="options.featuredArticleTitle"
      label="Featured article title"
      field-name="featuredArticleTitle"
      :state="form"
      :required="true"
    />

    <select-field
      v-model="options.dayOfRelease"
      label="Day of release"
      field-name="dayOfRelease"
      :state="form"
      :options="weekDays"
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
  import moment from 'moment';

  import optionsMixin from 'mixins/options-form';

  export default {
    mixins: [optionsMixin],

    computed: {
      weekDays() {
        return moment.weekdays().map((day, index) => ({
          label: day,
          value: index
        }));
      }
    },

    data() {
      return {
        options: {
          subscribersNumber: this.widgetOptions.subscribersNumber || 0,
          featuredArticleTitle: this.widgetOptions.featuredArticleTitle || '',
          refreshRate: this.widgetOptions.refreshRate || '',
          dayOfRelease: this.widgetOptions.dayOfRelease || '',
        }
      };
    }
  };
</script>
