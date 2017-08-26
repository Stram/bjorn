<template>
  <vue-form
    :state="newsletterWidgetForm"
    @submit.prevent="onFormSubmit"
  >
    <input-field
      v-model="options.subscribersNumber"
      label="Number of subscribers"
      field-name="subscribersNumber"
      type="number"
      :state="newsletterWidgetForm"
      :required="true"
    />

    <input-field
      v-model="options.nextIssueDate"
      label="Date of next issue"
      field-name="nextIssueDate"
      type="date"
      :state="newsletterWidgetForm"
      :required="true"
    />

    <input-field
      v-model="options.featuredArticleTitle"
      label="Featured article title"
      field-name="featuredArticleTitle"
      :state="newsletterWidgetForm"
      :required="true"
    />

    <div :class="$style.actions">
      <util-button
        :theme="buttonThemes.OUTLINE"
        :class="$style.action"
        @click="onFormCancel"
      >
        Cancel
      </util-button>

      <util-button
        type="submit"
        :theme="buttonThemes.SECONDARY"
        :class="$style.action"
      >
        Save
      </util-button>
    </div>
  </vue-form>
</template>

<script>
  import moment from 'moment';

  import InputField from 'components/forms/InputField.vue';
  import UtilButton from 'components/utils/Button.vue';
  import buttonThemes from 'enums/button-themes';

  export default {
    components: {
      InputField,
      UtilButton
    },

    props: {
      widgetOptions: {
        type: Object,
        required: true,
      }
    },

    methods: {
      onFormSubmit() {
        this.$emit('widget:save-new-options', this.options);
      },

      onFormCancel() {
        this.$emit('cancel');
      }
    },

    data() {
      return {
        newsletterWidgetForm: {},
        options: {
          subscribersNumber: this.widgetOptions.subscribersNumber || 0,
          nextIssueDate: this.widgetOptions.nextIssueDate || moment().format('YYYY-MM-DD'),
          featuredArticleTitle: this.widgetOptions.featuredArticleTitle || ''
        },
        buttonThemes
      };
    }
  };
</script>

<style lang="scss" module>
  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .action {
    &:not(:first-child) {
      margin-left: 40px;
    }
  }
</style>
