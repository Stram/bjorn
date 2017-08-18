<template lang="html">
  <vue-form
    :state="timeWidgetForm"
    @submit.prevent="onFormSubmit"
  >
    <input-field
      v-model="options.location"
      label="Location"
      field-name="location"
      :state="timeWidgetForm"
      :required="true"
    />

    <input-field
      v-model="options.refreshRate"
      label="Refresh rate"
      field-name="refreshRate"
      sufix="seconds"
      type="number"
      :state="timeWidgetForm"
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
        this.$emit('widget:saveNewOptions', this.options);
      },

      onFormCancel() {
        this.$emit('cancel');
      }
    },

    data() {
      return {
        timeWidgetForm: {},
        options: {
          location: '',
          refreshRate: ''
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
